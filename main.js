class Calculator {
    constructor(previousTextElement,currentTextElement) {
        this.previousTextElement=previousTextElement;
        this.currentTextElement=currentTextElement;
        this.clear()
    }
    clear(){
        this.previous=''
        this.current=''
        this.operation=undefined
    }
    delete(){
        this.current=this.current.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number==='.' && this.current.includes('.')) return
        this.current=this.current.toString()+number.toString()
    }
    chooseOperation(operation){
        if(this.current==='') return
        if(this.previous !== ''){
            this.compute()
        }
        this.operation=operation
        this.previous=this.current
        this.current=''
    }
    compute(){
        let computation
        const prev=parseFloat(this.previous)
        const curr=parseFloat(this.current)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation=prev+curr
                break;
            case '-':
                computation=prev-curr
                break;
            case '*':
                computation=prev*curr
                break;
            case '÷':
                computation=prev/curr
                break;
            
            default:
                break;
        }
        this.current=computation
        this.operation=undefined
        this.previous=''

    }
    updateDisplay(){
        this.currentTextElement.innerText=this.current
        if(this.operation != null){
            this.previousTextElement.innerText=`${this.previous} ${this.operation}`
        }
        else{
            this.previousTextElement.innerText=this.previous
        }
        
    }
}

const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operations]')
const equalButton=document.querySelector('[data-equal]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousTextElement=document.querySelector('[data-previous]')
const currentTextElement=document.querySelector('[data-current]')


const calculator=new Calculator(previousTextElement,currentTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',()=>{
        calculator.compute()
        calculator.updateDisplay()
    })
    
allClearButton.addEventListener('click',()=>{
        calculator.clear()
        calculator.updateDisplay()
    })
deleteButton.addEventListener('click',()=>{
        calculator.delete()
        calculator.updateDisplay()
    })
