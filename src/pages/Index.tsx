import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

type Screen = "login" | "onboarding" | "main";
type Tab = "chats" | "claims" | "reports" | "employees" | "profile";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const mockChats = [
    { id: 1, name: "Производственный отдел", lastMessage: "Согласовано", time: "14:30", unread: 2, isGroup: true },
    { id: 2, name: "Алексей Иванов", lastMessage: "Когда встретимся?", time: "13:15", unread: 0, isGroup: false },
    { id: 3, name: "Отдел качества", lastMessage: "Новая рекламация", time: "12:00", unread: 5, isGroup: true },
    { id: 4, name: "Мария Петрова", lastMessage: "Отчет готов", time: "11:45", unread: 0, isGroup: false },
  ];

  const mockClaims = [
    { id: 1, title: "Дефект сварного шва", status: "Новая", date: "15.11.2024", author: "Иванов А.П." },
    { id: 2, title: "Брак покрытия", status: "В работе", date: "14.11.2024", author: "Петров С.И." },
    { id: 3, title: "Несоответствие размеров", status: "Закрыта", date: "13.11.2024", author: "Сидоров К.М." },
  ];

  const mockReports = [
    { id: 1, product: "Изделие А-123", factoryNum: "ЗН-4567", note: "СЗ-001", date: "15.11.2024" },
    { id: 2, product: "Изделие Б-456", factoryNum: "ЗН-4568", note: "СЗ-002", date: "14.11.2024" },
  ];

  const mockEmployees = [
    { id: 1, name: "Алексей Иванов", position: "Инженер", phone: "+7 900 123-45-67" },
    { id: 2, name: "Мария Петрова", position: "Технолог", phone: "+7 900 234-56-78" },
    { id: 3, name: "Сергей Сидоров", position: "Контролер ОТК", phone: "+7 900 345-67-89" },
    { id: 4, name: "Елена Смирнова", position: "Мастер", phone: "+7 900 456-78-90" },
  ];

  const handleLogin = () => {
    if (login && password) {
      setScreen("onboarding");
    }
  };

  const handleOnboarding = () => {
    setScreen("main");
  };

  if (screen === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
                <Icon name="Building2" size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Корпоративное приложение</h1>
              <p className="text-sm text-gray-500 mt-2">Войдите в систему</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button onClick={handleLogin} className="w-full h-12 text-base font-medium">
                Войти
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (screen === "onboarding") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Добро пожаловать!</h1>
              <p className="text-sm text-gray-500">Заполните профиль для начала работы</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Фамилия Имя</label>
                <Input placeholder="Иванов Алексей" className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Должность</label>
                <Input placeholder="Инженер" className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Телефон</label>
                <Input placeholder="+7 900 123-45-67" className="h-12" />
              </div>
              <Button onClick={handleOnboarding} className="w-full h-12 text-base font-medium mt-6">
                Продолжить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {activeTab === "chats" && "Чаты"}
              {activeTab === "claims" && "Рекламации"}
              {activeTab === "reports" && "Отчеты"}
              {activeTab === "employees" && "Сотрудники"}
              {activeTab === "profile" && "Профиль"}
            </h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {activeTab === "chats" && (
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-white">
                        {chat.isGroup ? <Icon name="Users" size={20} /> : chat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary">{chat.unread}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "claims" && (
          <div className="space-y-3">
            <Button className="w-full h-12">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать рекламацию
            </Button>
            {mockClaims.map((claim) => (
              <Card key={claim.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{claim.title}</h3>
                    <Badge variant={claim.status === "Новая" ? "default" : claim.status === "В работе" ? "secondary" : "outline"}>
                      {claim.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {claim.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {claim.author}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-3">
            <Button className="w-full h-12">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать отчет
            </Button>
            {mockReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">{report.product}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Заводской номер:</span>
                      <span className="font-medium">{report.factoryNum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Служебная записка:</span>
                      <span className="font-medium">{report.note}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Дата:</span>
                      <span className="font-medium">{report.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-2">
            {mockEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-white">
                        {employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.position}</p>
                      <p className="text-xs text-gray-400 mt-1">{employee.phone}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="bg-primary text-white text-2xl">АИ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">Алексей Иванов</h2>
                  <p className="text-sm text-gray-500">Инженер</p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Телефон:</span>
                    <span className="font-medium">+7 900 123-45-67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Логин:</span>
                    <span className="font-medium">{login}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Settings" size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-gray-900">Настройки</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Icon name="LogOut" size={20} className="text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">Выйти</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                activeTab === "chats" ? "text-primary bg-primary/10" : "text-gray-500"
              }`}
            >
              <Icon name="MessageCircle" size={24} />
              <span className="text-xs font-medium">Чаты</span>
            </button>
            
            <button
              onClick={() => setActiveTab("claims")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                activeTab === "claims" ? "text-primary bg-primary/10" : "text-gray-500"
              }`}
            >
              <Icon name="AlertCircle" size={24} />
              <span className="text-xs font-medium">Рекламации</span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                activeTab === "reports" ? "text-primary bg-primary/10" : "text-gray-500"
              }`}
            >
              <Icon name="FileText" size={24} />
              <span className="text-xs font-medium">Отчеты</span>
            </button>

            <button
              onClick={() => setActiveTab("employees")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                activeTab === "employees" ? "text-primary bg-primary/10" : "text-gray-500"
              }`}
            >
              <Icon name="Users" size={24} />
              <span className="text-xs font-medium">Сотрудники</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                activeTab === "profile" ? "text-primary bg-primary/10" : "text-gray-500"
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
