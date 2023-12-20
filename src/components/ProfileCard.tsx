// ProfileCard.tsx
import React from 'react'
import '../styles/ProfileCard.css'

interface ProfileCardProps {
  name: string
  userName: string
  email: string
  phone: string
  website: string
  companyName: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  userName,
  email,
  phone,
  website,
  companyName,
}) => {
  return (
    <div className="profile-card">
      <div className="info-container">
        <h2>{name}</h2>
        <p className="username">@{userName}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Website: {website}</p>
        <p>Company: {companyName}</p>
      </div>
    </div>
  )
}

export default ProfileCard
