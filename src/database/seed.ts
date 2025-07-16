import { PrismaClient } from '@prisma/client';

// Note: UserRole will be available after prisma generate

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clean existing data
    await prisma.userClassAssignment.deleteMany();
    await prisma.user.deleteMany();
    await prisma.class.deleteMany();

    console.log('🗑️  Cleaned existing data');

    // Create users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: 'Leanne Graham',
                email: 'Sincere@april.biz',
                role: 'INTERN',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Ervin Howell',
                email: 'Shanna@melissa.tv',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Clementine Bauch',
                email: 'Nathan@yesenia.net',
                role: 'ENGINEER',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Patricia Lebsack',
                email: 'Julianne.OConner@kory.org',
                role: 'ENGINEER',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Chelsey Dietrich',
                email: 'Lucio_Hettinger@annie.ca',
                role: 'INTERN',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Mrs. Dennis Schulist',
                email: 'Karley_Dach@jasper.info',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Kurtis Weissnat',
                email: 'Telly.Hoeger@billy.biz',
                role: 'ENGINEER',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Nicholas Runolfsdottir',
                email: 'Sherwood@rosamond.me',
                role: 'INTERN',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Glenna Reichert',
                email: 'Chaim_McDermott@dana.io',
                role: 'ENGINEER',
            },
        }),
        prisma.user.create({
            data: {
                name: 'Clementina DuBuque',
                email: 'Rey.Padberg@karina.biz',
                role: 'ADMIN',
            },
        }),
    ]);

    console.log(`👥 Created ${users.length} users`);

    // Create classes
    const classes = await Promise.all([
        prisma.class.create({
            data: {
                name: 'Advanced TypeScript Development',
                description: 'Learn advanced TypeScript patterns, decorators, and type system features.',
                capacity: 25,
            },
        }),
        prisma.class.create({
            data: {
                name: 'NestJS Microservices Architecture',
                description: 'Master microservices architecture using NestJS, Redis, and Docker.',
                capacity: 20,
            },
        }),
        prisma.class.create({
            data: {
                name: 'Database Design with PostgreSQL',
                description: 'Design scalable database schemas and learn advanced PostgreSQL features.',
                capacity: 30,
            },
        }),
        prisma.class.create({
            data: {
                name: 'API Security & Authentication',
                description: 'Implement secure APIs with JWT, OAuth, and best practices.',
                capacity: 15,
            },
        }),
        prisma.class.create({
            data: {
                name: 'Docker & Container Orchestration',
                description: 'Learn containerization, Docker Compose, and deployment strategies.',
                capacity: 20,
            },
        }),
    ]);

    console.log(`🏫 Created ${classes.length} classes`);

    // Create some initial assignments
    const assignments = await Promise.all([
        // TypeScript class assignments
        prisma.userClassAssignment.create({
            data: {
                userId: users[0].id, // Leanne (INTERN)
                classId: classes[0].id, // Advanced TypeScript
            },
        }),
        prisma.userClassAssignment.create({
            data: {
                userId: users[2].id, // Clementine (ENGINEER)
                classId: classes[0].id, // Advanced TypeScript
            },
        }),
        prisma.userClassAssignment.create({
            data: {
                userId: users[6].id, // Kurtis (ENGINEER)
                classId: classes[0].id, // Advanced TypeScript
            },
        }),

        // NestJS class assignments
        prisma.userClassAssignment.create({
            data: {
                userId: users[3].id, // Patricia (ENGINEER)
                classId: classes[1].id, // NestJS Microservices
            },
        }),
        prisma.userClassAssignment.create({
            data: {
                userId: users[8].id, // Glenna (ENGINEER)
                classId: classes[1].id, // NestJS Microservices
            },
        }),

        // Database class assignments
        prisma.userClassAssignment.create({
            data: {
                userId: users[1].id, // Ervin (ADMIN)
                classId: classes[2].id, // Database Design
            },
        }),
        prisma.userClassAssignment.create({
            data: {
                userId: users[5].id, // Mrs. Dennis (ADMIN)
                classId: classes[2].id, // Database Design
            },
        }),
        prisma.userClassAssignment.create({
            data: {
                userId: users[4].id, // Chelsey (INTERN)
                classId: classes[2].id, // Database Design
            },
        }),

        // Security class assignments
        prisma.userClassAssignment.create({
            data: {
                userId: users[9].id, // Clementina (ADMIN)
                classId: classes[3].id, // API Security
            },
        }),

        // Docker class assignments
        prisma.userClassAssignment.create({
            data: {
                userId: users[7].id, // Nicholas (INTERN)
                classId: classes[4].id, // Docker & Containers
            },
        }),
    ]);

    console.log(`🔗 Created ${assignments.length} user-class assignments`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Classes: ${classes.length}`);
    console.log(`- Assignments: ${assignments.length}`);

    // Display some statistics
    const usersByRole = await prisma.user.groupBy({
        by: ['role'],
        _count: true,
    });

    console.log('\n👥 Users by role:');
    usersByRole.forEach((group) => {
        console.log(`- ${group.role}: ${group._count}`);
    });

    const classesWithAssignments = await prisma.class.findMany({
        include: {
            _count: {
                select: { userAssignments: true },
            },
        },
    });

    console.log('\n🏫 Classes with assignment counts:');
    classesWithAssignments.forEach((cls) => {
        console.log(`- ${cls.name}: ${cls._count.userAssignments}/${cls.capacity}`);
    });
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 