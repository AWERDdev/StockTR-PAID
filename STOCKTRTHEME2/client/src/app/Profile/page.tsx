'use client'
import NavBarNoAUTH2 from "@/components/NavBarNoAUTH2"
import { useAppData } from "@/tools/useAppData"
import LogoutButton from "@/components/LogoutButton"
import type { User } from "@/Types/User"
import { useUserPasswordUpdate } from "@/tools/useUserPasswordUpdate"
import { API_BASE_URL } from "@/config"
import { useUserIcon } from "@/tools/useUserIcon"
import Image from "next/image"

const Profile: React.FC = () => {
  const {
    user,
    isLoading,
    isAUTH,
    handleLogout,
  } = useAppData()
 
  const { 
    success,
    error,
    setNEWPassword,
    sendNewPassword
  } = useUserPasswordUpdate()

  const { userIcon } = useUserIcon()
  
  const typedUser = user as User | null

  const handleProfileIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Profile icon clicked')
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file)
      const formData = new FormData()
      formData.append('icon', file)
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/updateProfileIcon`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData
        })
        const data = await response.json()
        console.log('Profile icon update response:', data)
      } catch (error) {
        console.error('Failed to send icon:', error)
      }
    }
  }
  if (isLoading) {
    return (
      <main className="min-h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="NavBar"><NavBarNoAUTH2 /></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50 text-center">
            <div className="loading text-gray-700">Loading profile...</div>
          </div>
        </div>
      </main>
    )
  }

  if (!isAUTH || !typedUser) {
    return (
      <main className="min-h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="NavBar"><NavBarNoAUTH2 /></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50 text-center">
            <div className="error text-gray-700">Please log in to view your profile.</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="NavBar"><NavBarNoAUTH2 /></div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-2xl hover:shadow-3xl transition-all duration-300">
          <h2 className="Profile-Information text-center text-3xl mb-8 font-bold text-gray-800">Profile Information</h2>
          <div className="user-info space-y-8">
            <div className="profileIcon container flex flex-col gap-4 items-center">
              <div className="ICON bg-gradient-to-br from-blue-100 to-purple-100 w-[120px] h-[120px] rounded-full text-center flex items-center justify-center text-4xl font-bold overflow-hidden border-4 border-blue-200 shadow-lg">
                {userIcon ? (
                  <Image 
                    src={userIcon} 
                    alt="Profile Icon" 
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                ) : (
                  '?'
                )}
              </div>
              <input type="file" className="hidden" id="profileIcon" onChange={handleProfileIcon} accept="image/*" />
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-500/20 w-full sm:w-auto"
                onClick={() => document.getElementById('profileIcon')?.click()}
              >
                Change Profile Icon
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="userRealName flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Name</label>
                <span className="text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-3 w-full shadow-sm">{typedUser.name || 'Not provided'}</span>
              </div>
              <div className="username flex flex-col">
                <label className="text-gray-700 mb-2 font-medium">Username</label>
                <span className="text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-3 w-full shadow-sm">{typedUser.username || 'Not provided'}</span>
              </div>
            </div>

            {typedUser.email && (
              <div className="userEmail flex flex-col items-center">
                <label className="text-gray-700 mb-2 font-medium">Email</label>
                <span className="text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-3 w-full max-w-md shadow-sm">{typedUser.email}</span>
              </div>
            )}

            <div className="Updatepassword flex flex-col items-center gap-4">
              <div className="w-full max-w-md">
                <label className="text-gray-700 block text-center mb-3 font-medium">New password</label>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div >
                  <input 
                    type="password" 
                    onChange={(e) => setNEWPassword(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 shadow-sm" 
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                <button 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-green-500/20 w-full sm:w-auto"
                    onClick={sendNewPassword}
                  >
                    Change Password
                  </button>
                  </div>
                  </div>
                {success && <p className="success text-green-600 text-center p-2 m-2 font-medium">{success}</p>}
                {error && <p className="error text-red-600 text-center p-2 m-2 font-medium">{error}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <LogoutButton handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile