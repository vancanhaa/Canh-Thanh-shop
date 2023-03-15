import { useEffect, useState } from "react"
import './user-edit-form.scss'

export default function UserEditForm ( {currentUserSelection, handleCurrentUserChange} ) {
   const [currentUser, setCurrentUser] = useState( currentUserSelection )

   useEffect(() => {
      setCurrentUser({...currentUserSelection})
   }, [currentUserSelection])

   const handleChangeFirstName = (value) => {
      setCurrentUser(prev => ({...prev, first_name: value}))
   }
   const handleChangeLastName = (value) => {
      setCurrentUser(prev => ({...prev, last_name: value}))
   }
   const handleChangePhone = (value) => {
      setCurrentUser(prev => ({...prev, phone: value}))
   }
   const handleChangeEmail = (value) => {
      setCurrentUser(prev => ({...prev, email: value}))
   }
   const handleChangeRole = (value) => {
      setCurrentUser(prev => ({...prev, role: value}))
   }

   useEffect(() => {
      handleCurrentUserChange(currentUser)
   }, [currentUser]);


   return (
      <div className="user-edit-form">
         <div className="form-group">
            <span>ID :</span>
            <input 
               type="text" 
               value={currentUser.id}
               disabled
            />
         </div>

         <div className="form-group">
            <span>Họ:</span>
            <input 
               type="text" 
               value={currentUser.last_name}
               onChange={(e)=>handleChangeLastName(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Tên:</span>
            <input 
               type="text" 
               value={currentUser.first_name}
               onChange={(e)=>handleChangeFirstName(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Số điện thoại:</span>
            <input 
               type="text" 
               value={currentUser.phone}
               onChange={(e)=>handleChangePhone(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>E-mail:</span>
            <input 
               type="text" 
               value={currentUser.email}
               onChange={(e)=>handleChangeEmail(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Vai trò:</span>
            <select 
               name="role" 
               id=""
               value={currentUser.role}
               onChange={(e)=>handleChangeRole(e.target.value)}
            >
               <option value="admin">Admin</option>
               <option value="user">User</option>
            </select>
         </div>

         <div className="form-group">
            <span>Mật khẩu:</span>
            <textarea 
               type="text" 
               value={currentUser.password}
               disabled
            />
         </div>
      </div>
   )
}