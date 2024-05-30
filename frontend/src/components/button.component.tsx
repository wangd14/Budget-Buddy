import React from 'react'
import styles from "@/styles/button.module.css"
import Link from 'next/link'

interface ButtonProps {
  text: string,
  url: string
}

const Button: React.FC<ButtonProps> = ({ text, url }) => {
  return (
    <Link href={url} target='_self'>
        <button className={`${styles.subscribe_button} py-2 px-6 bg-sky-950 text-white`}>
         {text}
       </button>
    </Link>
  )
}

export default Button
