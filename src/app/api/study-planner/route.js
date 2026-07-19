import { NextResponse } from 'next/server';

function generateStudyPlan({ subject, goal, hoursPerDay, deadline, difficulty }) {
    const now = new Date();
    const endDate = new Date(deadline);
    const totalDays = Math.max(1, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
    const totalWeeks = Math.ceil(totalDays / 7);
    const totalHours = totalDays * hoursPerDay;

    const difficultyMultiplier = { beginner: 0.7, intermediate: 1, advanced: 1.3 };
    const adjustedHours = totalHours * (difficultyMultiplier[difficulty] || 1);

    const topics = generateTopics(subject, difficulty, totalWeeks);
    const dailyPlan = generateDailyPlan(subject, topics, hoursPerDay, totalDays, difficulty);
    const weeklyRoadmap = generateWeeklyRoadmap(subject, topics, totalWeeks, hoursPerDay, difficulty);
    const revisionSchedule = generateRevisionSchedule(subject, topics, totalDays, hoursPerDay);
    const tips = generateTips(subject, difficulty, hoursPerDay);

    return {
        subject,
        goal,
        hoursPerDay,
        deadline,
        difficulty,
        totalDays,
        totalWeeks,
        totalHours: Math.round(adjustedHours),
        generatedAt: now.toISOString(),
        topics,
        dailyPlan,
        weeklyRoadmap,
        revisionSchedule,
        tips,
    };
}

function generateTopics(subject, difficulty, weeks) {
    const topicBank = {
        mathematics: ['Algebra Foundations', 'Linear Equations', 'Quadratic Functions', 'Trigonometry', 'Calculus Basics', 'Derivatives', 'Integrals', 'Probability & Statistics', 'Geometry Proofs', 'Number Theory'],
        physics: ['Mechanics', 'Kinematics', 'Newton\'s Laws', 'Energy & Momentum', 'Wave Motion', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Nuclear Physics'],
        chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Stoichiometry', 'Thermochemistry', 'Reaction Kinetics', 'Equilibrium', 'Acids & Bases', 'Organic Chemistry', 'Electrochemistry'],
        biology: ['Cell Biology', 'Genetics', 'DNA & RNA', 'Evolution', 'Ecology', 'Human Anatomy', 'Plant Biology', 'Microbiology', 'Immunology', 'Biochemistry'],
        'computer science': ['Data Types', 'Control Flow', 'OOP Concepts', 'Data Structures', 'Algorithms', 'Database Design', 'Networking Basics', 'Web Development', 'System Design', 'Testing'],
        literature: ['Literary Analysis', 'Essay Writing', 'Poetry Interpretation', 'Novel Studies', 'Drama & Shakespeare', 'Rhetoric', 'Critical Theory', 'Creative Writing', 'Research Methods', 'Citation Formats'],
        history: ['Timeline Construction', 'Primary Sources', 'Cause & Effect', 'Cultural Movements', 'Political Systems', 'Economic History', 'World Wars', 'Civil Rights', 'Historiography', 'Research Papers'],
        economics: ['Supply & Demand', 'Market Structures', 'Macroeconomics', 'Microeconomics', 'Game Theory', 'International Trade', 'Fiscal Policy', 'Monetary Policy', 'Development Economics', 'Behavioral Economics'],
        languages: ['Grammar Rules', 'Vocabulary Building', 'Reading Comprehension', 'Writing Skills', 'Speaking Practice', 'Listening Comprehension', 'Cultural Context', 'Idioms & Phrases', 'Translation', 'Fluency Drills'],
    };

    const key = Object.keys(topicBank).find(k => subject.toLowerCase().includes(k)) || 'mathematics';
    const baseTopics = topicBank[key];

    const count = Math.min(baseTopics.length, Math.max(4, weeks * 2));
    const selected = [];

    for (let i = 0; i < count; i++) {
        const progress = i / count;
        let complexity = 'introductory';
        if (progress > 0.6) complexity = 'advanced';
        else if (progress > 0.3) complexity = 'intermediate';

        selected.push({
            id: i + 1,
            name: baseTopics[i],
            complexity,
            estimatedHours: difficulty === 'advanced' ? 4 : difficulty === 'intermediate' ? 3 : 2,
            status: 'pending',
        });
    }

    return selected;
}

function generateDailyPlan(subject, topics, hoursPerDay, totalDays, difficulty) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = [];
    let topicIndex = 0;

    for (let day = 0; day < Math.min(totalDays, 28); day++) {
        const date = new Date();
        date.setDate(date.getDate() + day);
        const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];

        const sessions = [];
        let remainingHours = hoursPerDay;

        const isReviewDay = day % 7 === 6 || day % 7 === 0;

        if (isReviewDay && day > 0) {
            sessions.push({
                time: '09:00 - 10:30',
                activity: 'Review & Consolidation',
                type: 'review',
                description: 'Review concepts from the past week',
            });
            remainingHours -= 1.5;
        }

        while (remainingHours >= 1 && topicIndex < topics.length) {
            const topic = topics[topicIndex];
            const sessionHours = Math.min(remainingHours, topic.estimatedHours > remainingHours ? remainingHours : Math.min(topic.estimatedHours, 2));

            const startHour = 9 + (hoursPerDay - remainingHours);
            const endHour = startHour + sessionHours;

            sessions.push({
                time: `${String(startHour).padStart(2, '0')}:00 - ${String(Math.min(endHour, 23)).padStart(2, '0')}:00`,
                activity: topic.name,
                type: topicIndex % 3 === 0 ? 'learn' : topicIndex % 3 === 1 ? 'practice' : 'apply',
                description: `Study ${topic.name.toLowerCase()} - ${topic.complexity} level`,
            });

            remainingHours -= sessionHours;
            if (sessionHours >= topic.estimatedHours * 0.5) {
                topicIndex++;
            }
        }

        if (sessions.length === 0) {
            sessions.push({
                time: 'Flexible',
                activity: 'Self-study & Practice',
                type: 'practice',
                description: 'Work on practice problems or review notes',
            });
        }

        plan.push({
            day: day + 1,
            dayName,
            date: date.toISOString().split('T')[0],
            sessions,
            totalHours: hoursPerDay - remainingHours,
        });
    }

    return plan;
}

function generateWeeklyRoadmap(subject, topics, weeks, hoursPerDay, difficulty) {
    const roadmap = [];
    let topicIndex = 0;

    for (let week = 0; week < Math.min(weeks, 12); week++) {
        const weekTopics = [];
        const topicsThisWeek = Math.ceil(topics.length / weeks);

        for (let t = 0; t < topicsThisWeek && topicIndex < topics.length; t++) {
            weekTopics.push(topics[topicIndex]);
            topicIndex++;
        }

        const milestones = [];
        if (week === 0) milestones.push('Set up study environment');
        if (week === Math.floor(weeks / 2)) milestones.push('Mid-point review');
        if (week === weeks - 1) milestones.push('Final revision');

        roadmap.push({
            week: week + 1,
            title: week === 0 ? 'Foundation' : week === weeks - 1 ? 'Mastery' : `Week ${week + 1}`,
            topics: weekTopics,
            hoursTarget: hoursPerDay * 7,
            milestones,
            focus: week < weeks * 0.3 ? 'Understanding concepts' : week < weeks * 0.7 ? 'Building skills' : 'Consolidation & review',
        });
    }

    return roadmap;
}

function generateRevisionSchedule(subject, topics, totalDays, hoursPerDay) {
    const schedule = [];
    const revisionDays = [3, 7, 14, 21, 30];

    revisionDays.forEach(daysAfter => {
        if (daysAfter <= totalDays) {
            const date = new Date();
            date.setDate(date.getDate() + daysAfter);

            schedule.push({
                day: daysAfter,
                date: date.toISOString().split('T')[0],
                title: daysAfter === 3 ? 'First Review' : daysAfter === 7 ? 'Weekly Review' : daysAfter <= 14 ? 'Fortnightly Review' : 'Final Review',
                topics: topics.slice(0, Math.ceil(topics.length * 0.5)).map(t => t.name),
                estimatedHours: Math.min(hoursPerDay, 3),
                type: daysAfter <= 7 ? 'active-recall' : 'spaced-repetition',
            });
        }
    });

    return schedule;
}

function generateTips(subject, difficulty, hoursPerDay) {
    const generalTips = [
        { icon: 'clock', title: 'Pomodoro Technique', description: 'Study in 25-minute focused blocks with 5-minute breaks' },
        { icon: 'brain', title: 'Active Recall', description: 'Test yourself instead of re-reading notes' },
        { icon: 'repeat', title: 'Spaced Repetition', description: 'Review material at increasing intervals' },
        { icon: 'lightbulb', title: 'Interleaving', description: 'Mix different topics in a single study session' },
    ];

    const difficultyTips = {
        beginner: [
            { icon: 'target', title: 'Start Small', description: 'Begin with 30-45 minute sessions and gradually increase' },
            { icon: 'book', title: 'Build Foundations', description: 'Master basics before moving to advanced topics' },
        ],
        intermediate: [
            { icon: 'zap', title: 'Challenge Yourself', description: 'Practice with harder problems beyond comfort zone' },
            { icon: 'users', title: 'Study Groups', description: 'Discuss concepts with peers for deeper understanding' },
        ],
        advanced: [
            { icon: 'flame', title: 'Deep Work', description: 'Use longer 90-minute focused sessions for complex topics' },
            { icon: 'sparkles', title: 'Teach Others', description: 'Explaining concepts solidifies your understanding' },
        ],
    };

    const timeTips = hoursPerDay <= 2
        ? [{ icon: 'coffee', title: 'Quality Over Quantity', description: 'Make every minute count with focused study' }]
        : hoursPerDay >= 6
        ? [{ icon: 'heart', title: 'Avoid Burnout', description: 'Include physical activity and proper rest' }]
        : [];

    return [...generalTips, ...(difficultyTips[difficulty] || []), ...timeTips];
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { subject, goal, hoursPerDay, deadline, difficulty } = body;

        if (!subject || !goal || !hoursPerDay || !deadline || !difficulty) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const plan = generateStudyPlan({
            subject,
            goal,
            hoursPerDay: Number(hoursPerDay),
            deadline,
            difficulty,
        });

        return NextResponse.json(plan);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate study plan' },
            { status: 500 }
        );
    }
}
