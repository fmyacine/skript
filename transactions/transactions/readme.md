# 💰 Expense Tracker - JavaScript Task

## 📋 What You're Building
A simple app where users can add their income and expenses, and see their total balance update automatically.

---

## ✅ What You Need to Do

### **PART 1: Add a Transaction (When Form is Submitted)**

When the user fills out the form and clicks "Add Transaction":

1. **Stop the page from refreshing**
   - Use `event.preventDefault()`

2. **Get all the values from the form:**
   ```javascript
   const description = document.querySelector('#description').value;
   const amount = document.querySelector('#amount').value;
   const type = document.querySelector('#type').value;
   const category = document.querySelector('#category').value;
   ```

3. **Check if everything is filled out (validation):**
   - If description is empty → show alert "Please enter a description!"
   - If amount is 0 or less → show alert "Please enter a valid amount!"
   - If category is empty → show alert "Please select a category!"
   - Use `return;` to stop if validation fails

4. **Convert amount to a number:**
   ```javascript
   const amountNumber = parseFloat(amount);
   ```

5. **Create the transaction element:**
   ```javascript
   const transactionItem = document.createElement('li');
   transactionItem.classList.add('transaction-item');
   ```

6. **Add a class based on type:**
   ```javascript
   if (type === 'income') {
       transactionItem.classList.add('income');
   } else {
       transactionItem.classList.add('expense');
   }
   ```

7. **Get the emoji for the category:**
   ```javascript
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
   ```

8. **Make the category name start with capital letter:**
   ```javascript
   const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
   // 'food' becomes 'Food'
   ```

9. **Format the amount with + or - sign:**
   ```javascript
   let displayAmount;
   if (type === 'income') {
       displayAmount = '+$' + amountNumber.toFixed(2);
   } else {
       displayAmount = '-$' + amountNumber.toFixed(2);
   }
   ```

10. **Put everything inside the transaction element:**
    ```javascript
    transactionItem.innerHTML = `
        <div class="transaction-info">
            <p class="transaction-description">${emoji} ${description}</p>
            <p class="transaction-category">${categoryName}</p>
        </div>
        <span class="transaction-amount">${displayAmount}</span>
    `;
    ```

11. **Add the transaction to the list:**
    ```javascript
    const transactionsList = document.querySelector('#transactions-list');
    transactionsList.appendChild(transactionItem);
    ```

12. **Clear the form:**
    ```javascript
    document.querySelector('#transaction-form').reset();
    ```

13. **Update the totals (call the function you'll make in Part 2):**
    ```javascript
    updateTotals();
    ```

---

### **PART 2: Calculate and Show Totals**

Create a function that calculates total income, total expenses, and balance:

```javascript
function updateTotals() {
    // 1. Get all the transaction amounts on the page
    const allAmounts = document.querySelectorAll('.transaction-amount');
    
    // 2. Create variables to hold totals
    let totalIncome = 0;
    let totalExpense = 0;
    
    // 3. Loop through each amount
    allAmounts.forEach(function(amountElement) {
        // Get the text (like "+$100.00" or "-$50.00")
        const text = amountElement.textContent;
        
        // Remove the $ sign and convert to number
        const number = parseFloat(text.replace('$', ''));
        
        // Check if it starts with + (income) or - (expense)
        if (text.includes('+')) {
            totalIncome = totalIncome + number;
        } else {
            totalExpense = totalExpense + number;
        }
    });
    
    // 4. Calculate balance (income - expense)
    const balance = totalIncome - totalExpense;
    
    // 5. Update the display
    document.querySelector('#total-income').textContent = '+$' + totalIncome.toFixed(2);
    document.querySelector('#total-expense').textContent = '-$' + totalExpense.toFixed(2);
    document.querySelector('#total-balance').textContent = '$' + balance.toFixed(2);
    
    // 6. BONUS: Change balance color if negative
    const balanceElement = document.querySelector('#total-balance');
    if (balance < 0) {
        balanceElement.style.color = '#ff6b6b';
    } else {
        balanceElement.style.color = 'white';
    }
}
```

---

## 📝 Complete Step-by-Step Checklist

**Before you start coding:**
- [ ] Open expense.html in your browser
- [ ] Open expense.js in VS Code
- [ ] Make sure you can see both at the same time

**Step 1: Select the form**
```javascript
const form = document.querySelector('#transaction-form');
```

**Step 2: Add submit event listener**
```javascript
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Your code will go here
});
```

**Step 3: Inside the event listener, get all values**
```javascript
const description = document.querySelector('#description').value;
const amount = document.querySelector('#amount').value;
const type = document.querySelector('#type').value;
const category = document.querySelector('#category').value;
```

**Step 4: Add validation**
```javascript
if (description.trim() === '') {
    alert('Please enter a description!');
    return;
}

const amountNumber = parseFloat(amount);

if (isNaN(amountNumber) || amountNumber <= 0) {
    alert('Please enter a valid amount!');
    return;
}

if (category === '') {
    alert('Please select a category!');
    return;
}
```

**Step 5: Create category emojis object (outside the event listener)**
```javascript
const categoryEmojis = {
    food: '🍔',
    transport: '🚗',
    entertainment: '🎬',
    shopping: '🛍️',
    bills: '📄',
    salary: '💼',
    other: '📦'
};
```

**Step 6: Get emoji and capitalize category**
```javascript
const emoji = categoryEmojis[category];
const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
```

**Step 7: Format amount with +/-**
```javascript
let displayAmount;
if (type === 'income') {
    displayAmount = '+$' + amountNumber.toFixed(2);
} else {
    displayAmount = '-$' + amountNumber.toFixed(2);
}
```

**Step 8: Create transaction element**
```javascript
const transactionItem = document.createElement('li');
transactionItem.classList.add('transaction-item', type);
```

**Step 9: Set the HTML content**
```javascript
transactionItem.innerHTML = `
    <div class="transaction-info">
        <p class="transaction-description">${emoji} ${description}</p>
        <p class="transaction-category">${categoryName}</p>
    </div>
    <span class="transaction-amount">${displayAmount}</span>
`;
```

**Step 10: Add to page**
```javascript
const transactionsList = document.querySelector('#transactions-list');
transactionsList.appendChild(transactionItem);
```

**Step 11: Clear form**
```javascript
form.reset();
```

**Step 12: Update totals**
```javascript
updateTotals();
```

**Step 13: Create the updateTotals function (outside the event listener)**
```javascript
function updateTotals() {
    const allAmounts = document.querySelectorAll('.transaction-amount');
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    allAmounts.forEach(function(amountElement) {
        const text = amountElement.textContent;
        const number = parseFloat(text.replace('$', ''));
        
        if (text.includes('+')) {
            totalIncome = totalIncome + number;
        } else {
            totalExpense = totalExpense + number;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    document.querySelector('#total-income').textContent = '+$' + totalIncome.toFixed(2);
    document.querySelector('#total-expense').textContent = '-$' + totalExpense.toFixed(2);
    document.querySelector('#total-balance').textContent = '$' + balance.toFixed(2);
}
```

**Step 14: Call updateTotals once at the start**
```javascript
updateTotals();
```

---

## 🧪 Testing Your App

**Test 1: Add Income**
- Description: "Monthly Salary"
- Amount: 2000
- Type: Income
- Category: Salary
- Click "Add Transaction"
- ✅ Should show: +$2000.00 in green
- ✅ Balance should be: $2000.00
- ✅ Total Income: +$2000.00

**Test 2: Add Expense**
- Description: "Groceries"
- Amount: 150
- Type: Expense
- Category: Food
- Click "Add Transaction"
- ✅ Should show: -$150.00 in red
- ✅ Balance should be: $1850.00
- ✅ Total Expense: -$150.00

**Test 3: Empty Fields**
- Leave description empty
- Click "Add Transaction"
- ✅ Should show alert

**Test 4: Zero Amount**
- Enter 0 in amount
- Click "Add Transaction"
- ✅ Should show alert

---

## 💡 Important Things to Remember

### Numbers vs Strings
```javascript
const amount = '100';        // This is a STRING
const number = parseFloat(amount);  // This is a NUMBER (100)

// You need numbers for math:
const total = number + 50;   // 150 ✅
const wrong = amount + 50;   // "10050" ❌
```

### Making Decimals Look Nice
```javascript
const amount = 25.5;
amount.toFixed(2);  // "25.50"

const amount2 = 100;
amount2.toFixed(2);  // "100.00"
```

### Checking if Something is Empty
```javascript
const text = "  ";
text === "";          // false (has spaces)
text.trim() === "";   // true (removes spaces first)
```

### The `return` Statement
```javascript
if (something is wrong) {
    alert('Error!');
    return;  // STOP HERE - don't run any more code
}

// This only runs if nothing was wrong
```

---

## 🆘 Common Mistakes

**Mistake 1: Forgetting to convert to number**
```javascript
// ❌ WRONG
const amount = document.querySelector('#amount').value;
const total = amount + 100;  // "50100" (not 150!)

// ✅ CORRECT
const amount = parseFloat(document.querySelector('#amount').value);
const total = amount + 100;  // 150
```

**Mistake 2: Not using .toFixed(2)**
```javascript
// ❌ Shows: $100.5
displayAmount = '$' + amount;

// ✅ Shows: $100.50
displayAmount = '$' + amount.toFixed(2);
```

**Mistake 3: Forgetting to call updateTotals()**
```javascript
// After adding transaction:
transactionsList.appendChild(transactionItem);
form.reset();
updateTotals();  // Don't forget this!
```

**Mistake 4: Spelling mistakes**
```javascript
// ❌ WRONG
categoryEmojis['Food']  // Won't work (capital F)

// ✅ CORRECT
categoryEmojis['food']  // Works (lowercase)
```

---

## 🎯 What You're Learning

By completing this task, you'll practice:
- ✅ Form handling (`event.preventDefault()`)
- ✅ Getting input values (`.value`)
- ✅ Validation (checking if fields are filled)
- ✅ Converting strings to numbers (`parseFloat()`)
- ✅ Working with decimals (`.toFixed(2)`)
- ✅ Creating elements (`createElement()`)
- ✅ Adding classes (`classList.add()`)
- ✅ Setting HTML content (`innerHTML`)
- ✅ Looping through elements (`forEach()`)
- ✅ String methods (`.replace()`, `.includes()`, `.charAt()`, `.toUpperCase()`, `.slice()`)
- ✅ Template literals (`` `${variable}` ``)
- ✅ Object property access (`object[key]`)
- ✅ If/else statements
- ✅ Functions
- ✅ Math operations

---

## 🚀 You Can Do This!

**Tips for success:**
1. Follow the steps in order
2. Test after each step
3. Use `console.log()` to check your values
4. Don't worry if you make mistakes - that's how you learn!
5. Ask for help if you're stuck

**Good luck! 💪**