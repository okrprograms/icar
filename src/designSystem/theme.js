import { createTheme} from '@rneui/themed';

const theme = createTheme({
    lightColors: {
      primary: 'red',
    },
    darkColors: {
      primary: 'blue',
    },
    components: {
      Button: {
        raised: false,
        color:"red",
        containerStyle:{
            margin:5
        },
        buttonStyle:{
            borderRadius:10,
            padding:15
        }
        // containerStyle:{
        //     backgroundColor:"pink"
        // }
      },
      Text:{
        margin:5,
        h1Style:{
            color:"red"
        }
      },
      Input:{
        // borderWidth:1,
        // borderRadius:10,
        // borderColor:'orange'
        padding:10,
        borderColor:'red'
      },
      Icon:{
        color:'red'
      }
    },
  });

  export {theme}