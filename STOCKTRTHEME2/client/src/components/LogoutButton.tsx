'use client'

interface LogoutButtonProps {
  handleLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({handleLogout}) =>{
    return(
        <>
              <div className="BTN-container">
          <button 
            className="bg-[#009688] hover:bg-[#00796b] text-white rounded p-2 w-[5rem] text-[1rem]" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        </>
    )
}
export default LogoutButton