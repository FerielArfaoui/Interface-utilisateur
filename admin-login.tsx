"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ShoppingBag, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dashboards, setDashboards] = useState([]);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      console.log(data);
      setDashboards(data.dashboards);
      setShowModal(true)
    } catch (err) {
      setError('Erreur : Identifiants invalides');
      setDashboards([]);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDashboardClick = (url: string) => {
    window.open(url, '_blank');
    setShowModal(false); // close modal after clicking
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-2 rounded-xl">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">EcommerceAdmin</h1>
                <p className="text-sm text-slate-600">Tableau de bord administrateur</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">Plateforme sécurisée</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Connexion Administrateur</h2>
                <p className="text-blue-100">Accédez à votre espace de gestion</p>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 hover:border-slate-400"
                      placeholder="admin@exemple.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 hover:border-slate-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
                >
                  Se connecter
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Nouveau sur la plateforme ?</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Créer un compte administrateur
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">🔒 Connexion sécurisée avec chiffrement SSL</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-2 rounded-xl">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-800">EcommerceAdmin</span>
              </div>
              <p className="text-slate-600 text-sm max-w-md">
                Plateforme de gestion professionnelle pour administrateurs e-commerce. Sécurisée, intuitive et
                performante.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Sécurité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-600">© 2024 EcommerceAdmin. Tous droits réservés.</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-sm text-slate-600">Version 2.1.0</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Système opérationnel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            background: 'white', padding: 20, borderRadius: 10,
            minWidth: '300px', textAlign: 'center'
          }}>
            <h3>Choisissez un dashboard :</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {dashboards.map((url, index) => (
                <li key={index} style={{ margin: '10px 0' }}>
                  <button onClick={() => handleDashboardClick(url)} style={{ padding: '8px 12px' }}>
                    {url}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
