import { animate } from "motion"

const useAnimation = (animationName:string, targetId:string) => {
    switch(animationName){
        case 'hoverChoice':
            console.log('YES');
            break;
        case 'staggerResults':
            break;
    }
}

export default useAnimation;