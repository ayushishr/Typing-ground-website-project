// import { create } from "@mui/material/styles/createTransitions";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing:border-box;
  
}
body{
    background:${({theme})=>theme.background};
    color:${({theme})=>theme.textColor};
    margin:0;
    padding:0;
    transition:all 0.25s linear;
    margin-top:28px;
  
}
.canvas{
 
    display:grid;
    min-height:100vh;
    grid-auto-flow:row;
    grid-template-row:auto 1fr auto;
    gap:0.5rem;
    padding:2rem;
    width:100vw:
    align-item:center;
    text-align:center;
}

.type-box{
    max-width:68%;
    height:180px;
    margin-top:15px;
    margin-bottom:-80px;     //chnages in this css added bottom ,top,and max width %
    margin-left:auto;
    margin-right:auto;
    overflow:hidden;
    color:${({theme})=>theme.typeBoxText}  ;
    margin-top:1px;
}
.words{
    display:flex;
    font-size:28px;
    flex-wrap:wrap;
}
.word{
    margin:3px;
}

.hiden{
opacity:0;
}

.current{
    border-left:1px solid;
    animation:blinking 2s infinite;
    animation-timing-function:ease;
    @keyframes blinking{
        0%{border-left-color:${({theme})=>theme.textColor};}
        25%{border-left-color:${({theme})=>theme.background};}
        50%{border-left-color:${({theme})=>theme.textColor};}
        75%{border-left-color:${({theme})=>theme.background};}
        100%{border-left-color:${({theme})=>theme.textColor};}
    }
}

.current-right{
    border-right:1px solid;
    animation:blinkingRight 2s infinite;
    animation-timing-function:ease;
    @keyframes blinkingRight{
        0%{border-right-color:${({theme})=>theme.textColor};}
        25%{border-right-color:${({theme})=>theme.background};}
        50%{border-right-color:${({theme})=>theme.textColor};}
        75%{border-right-color:${({theme})=>theme.background};}
        100%{border-right-color:${({theme})=>theme.textColor};}
    }
}
.correct{
    color:green;
}
.Incorrect{
    color:red;
}
.upper-menu{
    display:flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    font-size:1.35rem;
    justify-content:space-between;
    padding:0.2rem;
}
.modes{
    display:flex;
    gap:0.5rem;
}
.time-mode:hover{
    color:${({theme})=>theme.textColor};
    cursor:pointer;
    border:1px solid;
}


.footer{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
}
.stats-box{
    display:flex;
    width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}
.left-stats{
    width:30%;
    padding:30px;

}
.right-stats{
    width:70%;
}
.title{
    font-size:20px;
    color:${({theme})=>theme.typeBoxText};
}
.subtitle{
    font-size:30px;
}
.header{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
    margin-top:40px;
}
.user-profile{
    width:100px;
    margin:auto;
    display:flex;
    height:15rem;
    background:${({theme})=>theme.typeBoxText};
    border-radius:20px;
    padding:1rem;
    justify-content:center;
    align-text:center;

}
.user-info{
    width: 1000px;
    margin: auto;
    display: flex;
    color: ${({theme})=>theme.background};
    background: ${({theme})=>theme.textColor};
    min-height:2rem;
    border-radius: 20px;
}
.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    border-right: 2px solid;
   
}
.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}
.total-tests-taken{
    width: 50%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.table,.graph-user-page{
    margin:auto;
    width:1000px;
}
.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content:center;
    align-item:center;
}
.a,.b{
    color:${({theme})=>theme.textColor};
}
.restart {
    font-size: 40px;
    margin-top: 5px;
    cursor: pointer;
}
`