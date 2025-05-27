function createBankAccount(initialBalance) {
    let balance = initialBalance; 

    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
            }
            return balance;
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient funds or invalid amount");
            }
            return balance;
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);

console.log(account.deposit(50));     
console.log(account.withdraw(30));      
console.log(account.getBalance());
