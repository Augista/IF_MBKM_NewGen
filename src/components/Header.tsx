'use client'

import { useContext } from "react"
import AvatarMenu from "@/components/AvatarMenu"
import Typography from "@/components/Typography"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/context/AuthContext"

export const Header = () => {
  const isMobile = useIsMobile()
  const { user } = useAuth()

  return (
    <div className="flex gap-3 justify-between">
      <Typography
        variant="h5"
        font="Figtree"
        weight="semibold"
        className="text-[24px] text-card-foreground"
      >
        Hai{user?.nama ? `, ${user.nama}` : '...'}
      </Typography>

      {!isMobile && <AvatarMenu />}
    </div>
  )
}
