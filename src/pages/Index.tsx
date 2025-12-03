import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

type Screen = "login" | "onboarding" | "main" | "chat" | "createClaim" | "createReport" | "admin";
type Tab = "chats" | "claims" | "reports" | "employees" | "profile";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockChats = [
    { id: 1, name: "Производственный отдел", lastMessage: "Согласовано", time: "14:30", unread: 2, isGroup: true },
    { id: 2, name: "Алексей Иванов", lastMessage: "Когда встретимся?", time: "13:15", unread: 0, isGroup: false },
    { id: 3, name: "Отдел качества", lastMessage: "Новая рекламация", time: "12:00", unread: 5, isGroup: true },
    { id: 4, name: "Мария Петрова", lastMessage: "Отчет готов", time: "11:45", unread: 0, isGroup: false },
  ];

  const mockMessages = [
    { id: 1, sender: "Петров С.И.", text: "Добрый день! Проверьте новую партию", time: "14:25", isMine: false },
    { id: 2, sender: "Я", text: "Проверил, все в порядке", time: "14:28", isMine: true },
    { id: 3, sender: "Иванов А.П.", text: "Согласовано", time: "14:30", isMine: false },
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

  const mockUsers = [
    { id: 1, login: "ivanov_a", phone: "+7 900 123-45-67", canCreateClaims: true, canCreateReports: true, active: true },
    { id: 2, login: "petrova_m", phone: "+7 900 234-56-78", canCreateClaims: true, canCreateReports: false, active: true },
    { id: 3, login: "sidorov_s", phone: "+7 900 345-67-89", canCreateClaims: false, canCreateReports: true, active: false },
  ];

  const handleLogin = () => {
    if (login && password) {
      if (login === "admin") {
        setScreen("admin");
      } else {
        setScreen("onboarding");
      }
    }
  };

  const handleOnboarding = () => {
    setScreen("main");
  };

  const openChat = (chatId: number) => {
    setSelectedChat(chatId);
    setScreen("chat");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
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
              <p className="text-xs text-center text-gray-500 mt-2">
                Подсказка: логин "admin" для админ-панели
              </p>
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

  if (screen === "chat") {
    const currentChat = mockChats.find(chat => chat.id === selectedChat);
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setScreen("main")}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-white">
                  {currentChat?.isGroup ? <Icon name="Users" size={20} /> : currentChat?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-base font-semibold text-gray-900">{currentChat?.name}</h1>
                <p className="text-xs text-gray-500">{currentChat?.isGroup ? "Групповой чат" : "В сети"}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">
          <div className="space-y-3">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${msg.isMine ? "bg-primary text-white" : "bg-white"} rounded-2xl px-4 py-3 shadow-sm`}>
                  {!msg.isMine && <p className="text-xs font-medium mb-1 opacity-70">{msg.sender}</p>}
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isMine ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="bg-white border-t border-gray-200 px-4 py-3 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              placeholder="Сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" onClick={() => setMessage("")}>
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "createClaim") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => { setScreen("main"); setUploadedImages([]); }}>
                <Icon name="X" size={20} />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Новая рекламация</h1>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Описание дефекта</label>
                <Textarea 
                  placeholder="Опишите обнаруженный брак подробно..."
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Фотографии</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full h-24 border-dashed"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="Camera" size={24} />
                    <span className="text-sm">Добавить фото</span>
                  </div>
                </Button>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => removeImage(idx)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-12" onClick={() => { setScreen("main"); setUploadedImages([]); }}>
            Отправить рекламацию
          </Button>
        </div>
      </div>
    );
  }

  if (screen === "createReport") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => { setScreen("main"); setUploadedImages([]); }}>
                <Icon name="X" size={20} />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Новый отчет</h1>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Название изделия</label>
                <Input placeholder="Изделие А-123" className="h-12" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Заводской номер</label>
                <Input placeholder="ЗН-4567" className="h-12" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Номер служебной записки</label>
                <Input placeholder="СЗ-001" className="h-12" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Фотографии</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full h-24 border-dashed"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="Camera" size={24} />
                    <span className="text-sm">Добавить фото</span>
                  </div>
                </Button>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => removeImage(idx)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-12" onClick={() => { setScreen("main"); setUploadedImages([]); }}>
            Создать отчет
          </Button>
        </div>
      </div>
    );
  }

  if (screen === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Администрирование</h1>
              <Button variant="ghost" size="icon" onClick={() => setScreen("login")}>
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <Button className="w-full h-12">
            <Icon name="UserPlus" size={20} className="mr-2" />
            Добавить пользователя
          </Button>

          <div className="space-y-3">
            {mockUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.login}</h3>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                    <Badge variant={user.active ? "default" : "secondary"}>
                      {user.active ? "Активен" : "Деактивирован"}
                    </Badge>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Создание рекламаций</span>
                      <Switch checked={user.canCreateClaims} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Создание отчетов</span>
                      <Switch checked={user.canCreateReports} />
                    </div>
                  </div>

                  <Button variant="destructive" size="sm" className="w-full mt-3">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить пользователя
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openChat(chat.id)}>
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
            <Button className="w-full h-12" onClick={() => setScreen("createClaim")}>
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
            <Button className="w-full h-12" onClick={() => setScreen("createReport")}>
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

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setScreen("login")}>
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
