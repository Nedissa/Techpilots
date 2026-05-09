'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Logo } from '../components/Logo';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profil');
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('kunduppgifter');
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleRegister called', { firstName, lastName, registerEmail, registerPassword });
    if (firstName && lastName && registerEmail && registerPassword) {
      // Spara användardatan
      const userData = {
        firstName,
        lastName,
        email: registerEmail,
        createdAt: new Date().toISOString()
      };
      console.log('Saving userData:', userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUserData(userData);
      setIsLoggedIn(true);
      // Clear form fields
      setFirstName('');
      setLastName('');
      setRegisterEmail('');
      setRegisterPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('userData');
  };

  // Ladda sparad userData när sidan öppnas
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const userData = JSON.parse(savedData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setRegisterEmail(userData.email);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to load user data', e);
      }
    }
  }, []);

  return (
    <MainLayout bordered={false}>
      {!isLoggedIn ? (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <Logo />
            <span className="text-3xl font-bold">Techpilots</span>
          </div>
          <div className="w-full">
            <div className="space-y-6">
              {/* Login Form */}
              {showLogin && (
                <div className="p-8 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <h2 className="text-2xl font-bold mb-6">Logga in</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                      Logga in
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Glömt lösenord?{' '}
                    <button className="text-blue-600 hover:underline">Återställ här</button>
                  </p>
                </div>
              )}

              {/* Register Form */}
              {!showLogin && (
                <div className="p-8 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <h2 className="text-2xl font-bold mb-6">Skapa konto</h2>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Förnamn</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Johan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Efternamn</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Andersson"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="din@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                      Skapa konto
                    </button>
                  </form>
                </div>
              )}

              {/* Toggle */}
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {showLogin ? 'Har du inget konto?' : 'Redan medlem?'}
                </p>
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {showLogin ? 'Skapa ett här' : 'Logga in här'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <div className="w-full max-w-4xl mx-auto px-6 py-16">
            {/* Welcome Section */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8 shadow-sm flex justify-between items-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <div>
                <h2 className="text-2xl font-bold mb-2">Välkommen, {firstName || 'Johan'}!</h2>
                <p className="text-gray-600">Hantera ditt konto och se dina beställningar</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold whitespace-nowrap ml-8"
              >
                Logga ut
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('profil')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'profil'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('orderhistorik')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'orderhistorik'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Orderhistorik
              </button>
              <button
                onClick={() => setActiveTab('favoriter')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'favoriter'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Favoriter
              </button>
              <button
                onClick={() => setActiveTab('kundklubb')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'kundklubb'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Kundklubb
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'profil' && (
            <div className="space-y-3">
              {/* Accordion Items */}
              {[
                { id: 'kunduppgifter', title: 'Mina kunduppgifter' },
                { id: 'ordrar', title: 'Ordrar' },
                { id: 'kophistorik', title: 'Köphistorik' },
                { id: 'felanmalan', title: 'Felanmälan' },
                { id: 'erbjudanden', title: 'Erbjudanden' },
                { id: 'sparade', title: 'Sparade favoriter' }
              ].map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <button
                    onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-transparent transition-colors"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
                      <svg
                        className={`w-4 h-4 text-white transition-transform ${
                          expandedAccordion === item.id ? '-rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {expandedAccordion === item.id && (
                    <div className="px-6 py-6 bg-white">
                      {item.id === 'kunduppgifter' && (
                        <div className="space-y-4">
                          <div><span className="font-semibold">Namn:</span> {firstName && lastName ? `${firstName} ${lastName}` : '—'}</div>
                          <div><span className="font-semibold">E-post:</span> {registerEmail || '—'}</div>
                          <div><span className="font-semibold">Telefon:</span> +46 70 123 45 67</div>
                          <div><span className="font-semibold">Adress:</span> Storgatan 1, 123 45 Stockholm</div>
                          <button className="mt-4 px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                            Redigera uppgifter
                          </button>
                        </div>
                      )}

                      {item.id === 'ordrar' && (
                        <div className="space-y-3">
                          <div className="pb-3 border-b">
                            <p className="font-semibold">Beställning #12345</p>
                            <p className="text-sm text-gray-600">2024-05-01 • 24,998 SEK</p>
                            <p className="text-sm text-green-600 font-semibold">Levererad</p>
                          </div>
                          <Link href="/konto/bestallningar">
                            <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                              Se alla ordrar
                            </button>
                          </Link>
                        </div>
                      )}

                      {item.id === 'kophistorik' && (
                        <div className="space-y-3 text-gray-700">
                          <p>Du har köpt 15 produkter totalt</p>
                          <p className="text-sm">Total värde: 156,243 SEK</p>
                          <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                            Se komplett köphistorik
                          </button>
                        </div>
                      )}

                      {item.id === 'felanmalan' && (
                        <div className="space-y-3 text-gray-700">
                          <p>Du har ingen aktiv felanmälan</p>
                          <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                            Anmäl ett fel
                          </button>
                        </div>
                      )}

                      {item.id === 'erbjudanden' && (
                        <div className="space-y-3 text-gray-700">
                          <p>Du har 3 aktiva erbjudanden</p>
                          <p className="text-sm">Se dina personliga erbjudanden baserat på dina köp</p>
                          <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                            Se alla erbjudanden
                          </button>
                        </div>
                      )}

                      {item.id === 'sparade' && (
                        <div className="space-y-3 text-gray-700">
                          <p>Du har 5 sparade favoriter</p>
                          <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                            Se dina favoriter
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}

            {activeTab === 'orderhistorik' && (
            <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-xl font-bold mb-6">Orderhistorik</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="font-semibold">Beställning #12345</p>
                  <p className="text-sm text-gray-600">2024-05-01 • 24,998 SEK</p>
                  <p className="text-sm text-green-600 font-semibold">Levererad</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="font-semibold">Beställning #12340</p>
                  <p className="text-sm text-gray-600">2024-04-15 • 14,998 SEK</p>
                  <p className="text-sm text-green-600 font-semibold">Levererad</p>
                </div>
              </div>
            </div>
            )}

            {activeTab === 'favoriter' && (
            <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-xl font-bold mb-4">Favoriter</h3>
              <p className="text-gray-600 mb-4">Du har 3 produkter på din önskelista</p>
              <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                Se önskelista
              </button>
            </div>
            )}

            {activeTab === 'kundklubb' && (
            <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-xl font-bold mb-4">Kundklubb</h3>
              <p className="text-gray-600 mb-4">Du är medlem i vår kundklubb och får exklusiva erbjudanden</p>
              <div className="mb-6">
                <p className="font-semibold mb-2">Dina poäng: 1,250 points</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{ width: '62.5%' }}></div>
                </div>
              </div>
              <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                Se mina benefits
              </button>
            </div>
            )}
      </div>
      )}
    </MainLayout>
  );
}
