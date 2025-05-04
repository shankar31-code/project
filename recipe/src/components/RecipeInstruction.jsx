function RecipeInstruction({analyzedInstruction}){
const steps=analyzedInstruction && analyzedInstruction[0]?.steps?analyzedInstruction[0].steps:[];
console.log(steps);
return (
    <div>
        <p className="mt-10 text-2xl mb-5 text-extrabold">Let Him Cook</p>
        <ul className="mx-5">
            {steps.map((stepObj)=>(
                <li className="mt-3" ckey={stepObj.number}>{stepObj.step}</li>
))}
        </ul>
    </div>
)
}
export default RecipeInstruction;