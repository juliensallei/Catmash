import { animate } from "motion"

/**
 * Ce hook personnalisé décrit chaque animation, et déclenche une méthode animate basée sur celle que nous sélectionnons.
 * Ce code peut être très verbeux, d'où le crochet personnalisé et la condition switch.
 * Comme toutes les animations ne sont pas faites pour chaque élément, nous devons passer un attribut id pour certains d'entre eux.
 */
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
        case 'heartPop':
            animate(
                `#${targetId}`,
                {
                    y: [0, -400],
                    scale: [0,0.8],
                    opacity: [0,1,0]
                },
                {
                    duration: 0.8,
                    easing: [0.19,1,0.22,1]
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