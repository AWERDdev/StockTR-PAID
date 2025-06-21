'use client'

interface LogoutButtonProps {
  handleLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({handleLogout}) =>{
    return(
        <>
              <div className="BTN-container">
          <button 
            className="bg-black rounded p-2 w-[5rem] text-[1rem]" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        </>
    )
}
export default LogoutButton