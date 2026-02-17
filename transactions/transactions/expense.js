const form=document.getElementById('transaction-form')
form.addEventListener('submit',()=>{
    event.preventDefault()
   const description = document.querySelector('#description').value;
   const nodescription=document.getElementById('no-description')
   const textdescription=document.getElementById('text-description')
   if(description ===''){
     nodescription.style.visibility='visible'
     nodescription.style.color='red'
    //  description.style.bordercolor='red'
     textdescription.classList.add('font-red')
     
     return;
    }
    else {
        nodescription.style.visibility='hidden'
        textdescription.classList.remove('font-red')
    }
    
    const amount = document.querySelector('#amount').value;
    const amountNumber=parseFloat(amount)
    const noamount=document.getElementById('no-amount')
    const textamount=document.getElementById('text-amount')
    if (amountNumber <= 0 || isNaN(amountNumber)) {
        noamount.style.visibility='visible'
        noamount.style.color='red'
        textamount.classList.add('font-red')

        return;
    }
    else {
        noamount.style.visibility='hidden'
        textamount.classList.remove('font-red')
    }

    const type = document.querySelector('#type').value;
    const notype =document.getElementById('no-type')
    const texttype=document.getElementById('text-type')
    if (type==='' ) {
        notype.style.visibility='visible'
        notype.style.color='red'
        texttype.classList.add('font-red')
        return;
    }
    else{
        notype.style.visibility='hidden'
        texttype.classList.remove('font-red')
    }

    const category = document.querySelector('#category').value;
    const nocategory =document.getElementById('no-category')
    const textcategory=document.getElementById('text-category')
    if (category==='') {
        nocategory.style.visibility='visible'
        nocategory.style.color='red'
        textcategory.classList.add('font-red')
        return;
    }
    else{
        nocategory.style.visibility='hidden'
        textcategory.classList.remove('font-red')

    }
    // const amountNumber=parseFloat(amount)
    const transactionItem = document.createElement('li');
     transactionItem.classList.add('transaction-item');
    const item=document.getElementById('transactions-list')
    item.appendChild(transactionItem)
    if (type === 'income') {
       transactionItem.classList.add('income');
    } 
    else {
       transactionItem.classList.add('expense');
    }
    
    const categoryEmojis = {
       food: '🍔',
       transport: '🚗',
       entertainment: '🎬',
       shopping: '🛍️',
       bills: '📄',
       salary: '💼',
       other: '📦'
    };
    const emoji = categoryEmojis[category];
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    let displayAmount;
   if (type === 'income') {
       displayAmount = '+$' + amountNumber.toFixed(2);
    } 
    else {
       displayAmount = '-$' + amountNumber.toFixed(2);
    }
    transactionItem.innerHTML = `
     <div class="transaction-info">
            <p class="transaction-description">${emoji} ${description}</p>
            <p class="transaction-category">${categoryName}</p>
        </div>
     <span class="transaction-amount">${displayAmount}</span>
    `
    document.querySelector('#transaction-form').reset();
    updateTotals();
    function updateTotals() {
        const allAmounts = document.querySelectorAll('.transaction-amount');
        let totalIncome = 0;
        let totalExpense = 0;
        allAmounts.forEach (function(amountElement) {
             const text = amountElement.textContent;
             const number = parseFloat(text.replace('$', ''));
            if (text.includes('+')) {
              totalIncome = totalIncome + number;
            } 
            else {
              totalExpense = totalExpense + number;
            }
        })
        const balance = totalIncome - totalExpense;
        document.querySelector('#total-income').textContent = '+$' + totalIncome.toFixed(2);
        document.querySelector('#total-expense').textContent = '-$' + totalExpense.toFixed(2);
        document.querySelector('#total-balance').textContent = '$' + balance.toFixed(2); 
        const balanceElement = document.querySelector('#total-balance');
        if (balance < 0) {
         balanceElement.style.color = '#ff6b6b';
        }
        else {
         balanceElement.style.color = 'white';
        }
        updateTotals();
    }
    
})