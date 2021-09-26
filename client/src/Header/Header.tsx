import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';

export const Header = () => {

    return <div className={s.wrapper}>
        <Link to={'/'}><h1 style={{marginLeft: '20px', color: 'var(--color-main)'}}>Dictionary</h1></Link>
        <Link to={'reader'}><h1 style={{marginRight: '20px', color: 'var(--color-main)'}}>Reader</h1></Link>
        </div>
}