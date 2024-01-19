import { animate } from "motion"

const useAnimation = (animationName:string, targetId?:string) => {
    switch(animationName){
        case 'hoverChoice':
            animate(
                `#${targetId}`,
                {scale: 1.1},
                {
                    duration: 0.5,
                    easing: [.47,1.64,.41,.8]
                }
            )
            break;
        case 'unHoverChoice':
            animate(
                `#${targetId}`,
                {scale: 1},
                {
                    duration: 0.5,
                    easing: [.47,1.64,.41,.8]
                }
            )
            break;
        case 'clickChoice':
            animate(
                `#${targetId}`,
                {scale: [1.1, 0.8, 1.1]},
                {
                    duration: 0.5,
                    easing: [.47,1.64,.41,.8]
                }
            )
            break;
        case 'fadeResults':
            animate(
                `main`,
                {opacity: [0, 1]},
                {
                    duration: 0.5,
                }
            )
            break;
    }
}

export default useAnimation;