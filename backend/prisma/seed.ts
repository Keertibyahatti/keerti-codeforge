import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CodeForge AI initial development data...');

  const passwordHash = await bcrypt.hash('demo123456', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@codeforge.ai' },
    update: {},
    create: {
      name: 'Demo Developer',
      email: 'demo@codeforge.ai',
      passwordHash,
      programs: {
        create: [
          {
            title: 'Hello CodeForge Python',
            language: 'python',
            code: 'def greet(name):\n    return f"Hello, {name}! Welcome to CodeForge AI."\n\nprint(greet("Developer"))\n',
            versions: {
              create: [
                {
                  language: 'python',
                  code: 'def greet(name):\n    return f"Hello, {name}! Welcome to CodeForge AI."\n\nprint(greet("Developer"))\n'
                }
              ]
            }
          },
          {
            title: 'Fibonacci Series in JS',
            language: 'javascript',
            code: 'function fibonacci(n) {\n  let sequence = [0, 1];\n  for (let i = 2; i < n; i++) {\n    sequence.push(sequence[i - 1] + sequence[i - 2]);\n  }\n  return sequence;\n}\n\nconsole.log("Fibonacci(10):", fibonacci(10));\n',
            versions: {
              create: [
                {
                  language: 'javascript',
                  code: 'function fibonacci(n) {\n  let sequence = [0, 1];\n  for (let i = 2; i < n; i++) {\n    sequence.push(sequence[i - 1] + sequence[i - 2]);\n  }\n  return sequence;\n}\n\nconsole.log("Fibonacci(10):", fibonacci(10));\n'
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`Seed completed successfully! Demo user created: ${demoUser.email}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
