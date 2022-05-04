import React from "react"
import blessed from "blessed"
import {render} from "react-blessed"

const App = ()=>{
    const [count,setCount] = React.useState(0)
    const timer = React.useRef();
    React.useEffect(()=>{
        timer.current = setTimeout(()=>
            setCount(
                count + 1
            )
        ,1000)
        return ()=>clearTimeout(timer.current)
    },[count])
    const dateTime = new Date().toLocaleString(
        "en-US",
        {
            month:"long",
            day:"numeric",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        }
    )
    return <box
    top="center" left="center" width="50%" height="50%" border={{type:"line"}} style={{ border:{fg:"blue"}}}
    >
        {`Today: ${dateTime}

Counter: ${count} ` } 
    </box>
}

const screen = blessed.screen({
    autoPadding:true,
    smartCSR:true,
    title:"Develop Dashboard"
});

screen.key(
    ["escape", "q","C-c"],
    ()=>process.exit(0)
)

const component = render(<App />,screen)
