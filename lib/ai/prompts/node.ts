import { UserInput } from "@/types/userInput";

export function buildNodePrompt(userInput: UserInput) {
    const {
        technologies,
        experience,
        goal,
        dailyAvailability,
        weeklyCommitment,
    } = userInput;
    console.log("userInput: ", userInput)
    return `
        You are a curriculum architect designing a learning roadmap as a directed acyclic graph.

        User profile:
        - Experience level: ${experience}
        - Goal: ${goal}
        - Daily study hours: ${dailyAvailability}
        - Weekly study days: ${weeklyCommitment}
        - Selected technologies: ${technologies.join(", ")}

        Your task:
        Generate ONLY roadmap nodes. Do NOT generate tasks, exercises, or projects.

        Rules:
        - Output MUST be a valid JSON array.
        - Do NOT include explanations, markdown, comments, or extra text.
        - Generate only necessary nodes. Avoid redundancy.
        - The graph must respect prerequisites and be acyclic.
        - Keep the roadmap concise but complete for the given goal and experience level.

        Each node MUST strictly follow this schema:

        {
        "id": "string (kebab-case, unique, stable)",
        "label": "string (human-readable)",
        "type": "concept | tool | optional | alternative",
        "isRoot": boolean,
        "parents": ["string"],
        "children": ["string"],
        "totalTasks": number,
        "meta": {
            "description": "string (1 short sentence)",
            "priority": "core | optional | advanced"
        }
        }

        Constraints:
        - Root nodes MUST have an empty parents array.
        - Non-root nodes MUST have at least one parent.
        - Parent and child references MUST match valid node ids.
        - Prefer fewer, well-structured nodes over many shallow nodes.
        - Priority meaning:
        - core: mandatory to reach the goal
        - optional: useful but not required
        - advanced: deeper or optimization-focused topics
        - totalTasks required to complete the node

        Return ONLY the JSON array of nodes.
        `.trim();
}
