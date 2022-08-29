import React from 'react'
import Menu from '../components/Menu';


export const UserInfo = () => {
  return (
    <div>
      <Menu isLogin={localStorage.getItem("token") ? true : false} />
    </div>
  )
}

export default UserInfo
