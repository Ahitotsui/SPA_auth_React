import axios from 'axios';
import { useCookies } from "react-cookie";
// import React, { useContext } from 'react';
import React, {Component} from 'react';
// import {SampleContext} from '../original_context/context';





// class Logout extends Component{
//     static contextType = SampleContext;
//     render(){
//       return(
//         <div>
//           {/* <h2>{this.context.title}</h2> */}
//         </div>
//       );
//     }
//   }

  function Logout(){
    // const contextType = SampleContext;
    return(
        <div>
          <h2>ログアウト</h2>
        </div>
      );
  }


export default Logout;