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
      <main className="min-h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="NavBar"><NavBarNoAUTH2 /></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="loading text-center p-20">Loading profile...</div>
        </div>
      </main>
    )
  }

  if (!isAUTH || !typedUser) {
    return (
      <main className="min-h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="NavBar"><NavBarNoAUTH2 /></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="error text-center p-20">Please log in to view your profile.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="NavBar"><NavBarNoAUTH2 /></div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="profile-section bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="Profile-Information text-center text-[1.5rem] mb-8 font-semibold">Profile Information</h2>
          <div className="user-info space-y-6">
            <div className="profileIcon container flex flex-col gap-4 items-center">
              <div className="ICON bg-gray-600 w-[120px] h-[120px] rounded-full text-center flex items-center justify-center text-4xl font-bold overflow-hidden">
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
                className="submit bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 w-full sm:w-[15vw] h-auto text-sm"
                onClick={() => document.getElementById('profileIcon')?.click()}
              >
                Change Profile Icon
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="userRealName flex flex-col">
                <label className="text-gray-400 mb-1">Name</label>
                <span className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-500 transition-all duration-300 shadow-sm ">{typedUser.name || 'Not provided'}</span>
              </div>
              <div className="username flex flex-col">
                <label className="text-gray-400 mb-1">Username</label>
                <span className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-500 transition-all duration-300 shadow-sm ">{typedUser.username || 'Not provided'}</span>
              </div>
            </div>

            {typedUser.email && (
              <div className="userEmail flex flex-col items-center">
                <label className="text-gray-400 mb-1">Email</label>
                <span className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-500 transition-all duration-300 shadow-sm">{typedUser.email}</span>
              </div>
            )}

            <div className="Updatepassword flex flex-col items-center gap-4">
              <div className="w-full max-w-md">
                <label className="text-gray-400 block text-center mb-2">New password</label>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div >
                  <input 
                    type="password" 
                    onChange={(e) => setNEWPassword(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-500 transition-all duration-300 shadow-sm" 
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                <button 
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 border border-green-500/20 w-full sm:w-auto"
                    onClick={sendNewPassword}
                  >
                    Change Password
                  </button>
                  </div>
                  </div>
                {success && <p className="success text-green-600 text-center p-1 m-1">{success}</p>}
                {error && <p className="error text-red-600 text-center p-1 m-1">{error}</p>}
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