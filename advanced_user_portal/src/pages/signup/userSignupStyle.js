import styled from "styled-components";
export const UserSignupStyle = styled.div`
   display:flex;
   flex-direction:column;
   gap:20px;
   .company__logo__container{
    padding:20px 0px 20px 10px;
    width:100%;
    background-color:#DCDCDC;
    @media (max-width: 920px) {
    }
   }
  .container {
    display:flex;

    justify-content:space-around;
    align-items:center;
    padding:40px;
    @media (max-width: 920px) {
        flex-direction:column;
        justify-content:center;
        align-items:center;
        padding:10px;
        gap:20px;
    }
  }
  .company__logo{
    width: 180px;
    height: 57px;
    @media (max-width: 920px) {
      width: 120px;
      height: 38px;
    }
  }
  h1{
    color:red;
  }
  .form {
    display:flex;
    flex-direction:column;
    gap:36px;
    @media (max-width: 920px) {
        order:2; 
        justify-content:center;
        align-items:center;
    }
  }
  .class__one {
    grid-column: 1 / span 3;
    position:relative;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .warning__password{
    max-width:200px;
    font-size:13px;
    text-align:left;
    color:red;
    @media (max-width: 920px) {
    }
  }
  .class__two {
    grid-column: 4 / span 3;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .class__three {
    grid-column: 1 / span 6;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .form__container {
    display:grid;
    grid-gap:20px;
    min-width:444px;
    @media (max-width: 920px) {
        min-width:320px;
    }
  }
  .form__box {
    display:flex;
    flex-direction:column;
    gap:3px;
    position:relative;
    label{
        font-weight:400;
  
    }
    input{
        box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
        border-radius: 8px;
        padding:12px;
    }
    select{
      box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding:12px; 
      border:2px solid black;
      
    }
    @media (max-width: 920px) {
        label{

        }
        input{
            box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
            border-radius: 8px;
            padding:8px;
           
        }
        select{
          box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          padding:8px;
        }
    }
  }
  .eye__container{
    position:absolute;
    left:190px;
    top:33px;
    @media(max-width:920px){
      left:285px;
      top:30px;
    }
  }
  .eye__container__two{
    position:absolute;
    left:170px;
    top:33px;
    @media(max-width:920px){
      left:285px;
      top:30px;
    }
  }
  .dot__box{
    font-weight:700;
    color:red;
    font-size:15px;
    @media(max-width:920px){
        font-size:10px;
    }
  }
  .warning__text {
    color:red;
    font-weight:700;
    font-size:15px;
    @media (max-width: 920px) {
      font-size:9px;
    }
  }
  .image__container{
    position:relative;
    @media (max-width: 920px) {

    }
  }
  .background__image{
    // width:558px;
    // height:504px;
    width:100px;
    height:90px;
    @media (max-width: 920px) {
        // width:270px;
        // height:240px;
        width:100px;
        height:90px;
    } 
  }
  .student__image{
    position:absolute;
    left:-12px;
    top:-12px;
    @media (max-width: 920px) {
        width:270px;
        height:240px;
        left:-6px;
        top:-6px;
    } 
  }
  .button__style{
    font-weight:700;
    font-size:20px;
    border-radius:15px;
    background-color: #FFD60A;
    min-height:48px;
    @media (max-width: 920px) {
        font-size:15px;
        width:200px;
    } 
  }
  .image__container__icon{
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(220, 220, 220);
    border-radius:50%;
    width:60px;
    height:60px;
    @media (max-width: 920px) {
    }
  }
  .main__title{
    font-weight:700;
    font-size:20px;
    margin-bottom:20px;
    @media (max-width: 920px) {
    }
  }
  .features__container{
    display:flex;
    flex-direction:column;
    gap:30px;
    @media (max-width: 920px) {
    }
  }
  .features__container__element
  {
    display:flex;
    align-items:center;
    gap:20px;
    @media (max-width: 920px) {
    }
  }
  .features__title{
    font-weight:700;
    font-size:20px;
    text-align:left;
    @media (max-width: 920px) {
    }
  }
  .features__subtitle{
    margin-top:10px;
    font-size:12px;
    max-width:268px;
    line-height:1.33;
    @media (max-width: 920px) {
    }
  }
`;