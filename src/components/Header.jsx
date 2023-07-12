import React from 'react'
import {ReactNavbar} from "overlay-navbar";
// import reactIcons from "react-icons"
import logo from '../images/logo.jpg';
// import SearchIcon from './SearchIcon';
import {FaSearch, FaShoppingCart} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'

function Header() {
  return (
    <>
    <ReactNavbar 
        burgerColor = "#6E35AE"
        burgerColorHover="purple"
        navColor1="white"
        logo = {logo}
        logoHoverColor = ""
        nav1FlexDirection = "column"
        link1Text = "HOME"
        link1Size = "1.5vmax"
        link1Family = "Roboto"
        link1Color = "#989897"
        link1Margin = "2vmax"
        link1Padding = "20px"
        link2Text = "PRODUCTS"
        link3Text = "CONTACT"
        link4Text = "ABOUT"
        link1Url ="/"
        link2Url ="/product"
        link3Url ="/contact"
        link4Url ="/about"
        link1ColorHover = "#6E35AE"
        searchIcon = {true}
        SearchIconElement = {FaSearch}
        searchIconMargin = "1.2vmax"
        profileIcon = {true}
        ProfileIconElement = {CgProfile}
        profileIconMargin = "1.2vmax"
        cartIcon = {true}
        CartIconElement = {FaShoppingCart}
        searchIconUrl = '/search'
        cartIconUrl = '/cart'
        profileIconUrl = '/account'
        searchIconColor = "#989897"
        profileIconColor = "#989897"
        cartIconColor = "#989897"
        searchIconColorHover = "#6E35AE"
        cartIconColorHover = "#6E35AE"
        profileIconColorHover	= "#6E35AE"
    />
    </>
  )
}

export default Header
