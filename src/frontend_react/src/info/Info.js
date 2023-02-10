import icon from "../img/conntest_white.png"

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ["rgb(0, 153, 200)", "rgb(77, 188, 188)"]

export const info = {
    appName: "Connectivity Tester",
    icon: icon, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
    baseColor: colors[1],
    tools: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
        {
            emoji: '🌎',
            text: 'Internet Connectivity'
        },
        {
            emoji: "🦾",
            text: "Shopfloor Connectivity"
        },
        {
            emoji: "📃",
            text: "DNS Name Resolution"
        },
        {
            emoji: '⏰',
            text: 'NTP Server Connectivity'
        },
        {
            emoji: '🖥️',
            text: 'OPC UA Server Browsing'
        },
        {
            emoji: '💬',
            text: 'HTTP Requests'
        }
    ]
}