const readline = require('readline');

function validatePassword(password) {
  if (typeof password !== 'string') {
    return 'Error: Password must be a string.';
  }

  // Requirement 1: The password must be at least 8 characters long.
  if (password.length < 8) {
    return 'Error: Password must be at least 8 characters long.';
  }

  // Requirement 2: The password must contain at least one uppercase letter.
  if (!/[A-Z]/.test(password)) {
    return 'Error: Password must contain at least one uppercase letter.';
  }

  // Requirement 3: The password must contain at least one number.
  if (!/\d/.test(password)) {
    return 'Error: Password must contain at least one number.';
  }

  // All requirements met
  return null;
}

function askQuestion(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer));
  });
}

async function runPasswordPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    while (true) {
      const password = await askQuestion(rl, 'Enter a new password: ');
      const errorMessage = validatePassword(password);

      if (errorMessage === null) {
        console.log('Password accepted and successfully set!');
        break;
      }

      console.log(errorMessage + ' Please try again.\n');
    }
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runPasswordPrompt().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { validatePassword, runPasswordPrompt };
