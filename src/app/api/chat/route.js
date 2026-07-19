import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are StudyMate AI, a helpful AI study companion. You help students understand concepts, solve problems, create study plans, and learn effectively. Be concise, clear, and encouraging. Use markdown formatting when appropriate including code blocks, lists, and headers.`;

function simulateStream(text) {
    const encoder = new TextEncoder();
    const words = text.split(' ');
    let index = 0;

    return new ReadableStream({
        start(controller) {
            const interval = setInterval(() => {
                if (index < words.length) {
                    const word = (index === 0 ? '' : ' ') + words[index];
                    controller.enqueue(encoder.encode(word));
                    index++;
                } else {
                    clearInterval(interval);
                    controller.close();
                }
            }, 30);
        },
    });
}

const DEMO_RESPONSES = {
    default: `I'd be happy to help you with that! Here's what I can tell you:

## Key Points

1. **Understanding the basics** is crucial before diving into advanced topics
2. Practice regularly to reinforce your learning
3. Don't hesitate to ask follow-up questions

### Study Tips

- Break complex topics into smaller chunks
- Use active recall instead of passive re-reading
- Create mind maps to visualize connections

Would you like me to elaborate on any of these points?`,

    quantum: `## Quantum Entanglement Explained

Quantum entanglement is one of the most fascinating phenomena in physics. Here's a simple way to think about it:

### The Basic Idea
When two particles become **entangled**, they share a quantum state. This means:

- Measuring one particle instantly affects the other
- This happens regardless of distance (even across galaxies!)
- Einstein called it "spooky action at a distance"

### A Simple Analogy
Imagine you have two magic coins:
1. You flip them both and separate them
2. When one lands heads, the other **always** lands tails
3. This happens instantly, no matter how far apart they are

### Why It Matters
- **Quantum computing** uses entanglement for powerful calculations
- **Quantum cryptography** enables unhackable communication
- **Quantum teleportation** transfers quantum states (not matter!)

The key insight is that entangled particles don't send signals to each other — they're fundamentally connected at the quantum level.`,

    thermodynamics: `## Laws of Thermodynamics

### First Law: Energy Conservation
Energy cannot be created or destroyed, only transformed.
> "You can't win, you can only break even"

### Second Law: Entropy Always Increases
In any spontaneous process, the total entropy of an isolated system always increases.
> "You can't break even (in a closed system)"

### Third Law: Absolute Zero
As temperature approaches absolute zero (0 K), entropy approaches a minimum value.
> "You can't reach absolute zero"

### Key Concepts
- **Internal Energy (U)**: Total energy of a system
- **Enthalpy (H)**: Heat content at constant pressure
- **Gibbs Free Energy**: Determines spontaneity (ΔG = ΔH - TΔS)

### Practical Applications
- Engine efficiency limits
- Refrigeration and heat pumps
- Chemical reaction feasibility`,

    integral: `## Solving ∫ x² eˣ dx

We'll use **integration by parts** twice.

### First Application
Let u = x² and dv = eˣ dx
Then du = 2x dx and v = eˣ

$$\\int x^2 e^x dx = x^2 e^x - \\int 2x e^x dx$$

### Second Application
For ∫ 2x eˣ dx, let u = 2x and dv = eˣ dx
Then du = 2 dx and v = eˣ

$$\\int 2x e^x dx = 2x e^x - \\int 2 e^x dx = 2x e^x - 2e^x$$

### Final Answer
$$\\int x^2 e^x dx = x^2 e^x - 2x e^x + 2e^x + C$$

Or simplified:
$$= e^x(x^2 - 2x + 2) + C$$

### Verification
Differentiate to check: d/dx [eˣ(x² - 2x + 2)] = eˣ(x² - 2x + 2) + eˣ(2x - 2) = x²eˣ ✓`,

    chemistry: `## Chemistry Exam Study Plan

### Week 1: Foundations
- [ ] Review atomic structure and periodic trends
- [ ] Practice electron configuration problems
- [ ] Quiz yourself on element symbols

### Week 2: Chemical Bonding
- [ ] Master Lewis structures
- [ ] Practice VSEPR theory predictions
- [ ] Understand hybridization concepts

### Week 3: Reactions & Stoichiometry
- [ ] Balance complex equations
- [ ] Practice mole calculations
- [ ] Review limiting reagent problems

### Week 4: Equilibrium & Acids
- [ ] ICE table calculations
- [ ] pH and buffer solutions
- [ ] Le Chatelier's principle applications

### Daily Habits
1. **Morning**: Review flashcards (15 min)
2. **Afternoon**: Practice problems (45 min)
3. **Evening**: Summarize what you learned (10 min)

### Exam Day Tips
- Read each question carefully
- Show all your work
- Check units in calculations
- Don't spend too long on one question

Good luck! You've got this! 🎯`,
};

function getResponseForMessage(message) {
    const lower = message.toLowerCase();

    if (lower.includes('quantum') && lower.includes('entangle')) {
        return DEMO_RESPONSES.quantum;
    }
    if (lower.includes('thermodynamic')) {
        return DEMO_RESPONSES.thermodynamics;
    }
    if (lower.includes('integral') || lower.includes('∫')) {
        return DEMO_RESPONSES.integral;
    }
    if (lower.includes('chemistry') && (lower.includes('exam') || lower.includes('study') || lower.includes('plan'))) {
        return DEMO_RESPONSES.chemistry;
    }

    return DEMO_RESPONSES.default;
}

export async function POST(request) {
    try {
        const { messages } = await request.json();
        const lastMessage = messages[messages.length - 1]?.content || '';

        const responseText = getResponseForMessage(lastMessage);
        const stream = simulateStream(responseText);

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
