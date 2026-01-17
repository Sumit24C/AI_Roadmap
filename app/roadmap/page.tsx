"use client";

import React, { useState } from "react";

export default function Page() {
  // ✅ technologies as array
  const [technologies, setTechnologies] = useState<string[]>([
    "HTML",
    "CSS",
    "JavaScript",
  ]);

  const [experience, setExperience] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");

  const [goal, setGoal] = useState<"job" | "startup" | "freelance">("job");

  const [dailyAvailability, setDailyAvailability] = useState<number>(2);
  const [weeklyCommitment, setWeeklyCommitment] = useState<number>(5);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "test_user_123", // hardcoded for testing
          userInput: {
            technologies,
            experience,
            goal,
            dailyAvailability,
            weeklyCommitment,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h2>Roadmap Generator (Test UI)</h2>

      {/* Technologies */}
      <div style={{ marginBottom: 12 }}>
        <label>Technologies (comma separated)</label>
        <input
          value={technologies.join(", ")}
          onChange={(e) =>
            setTechnologies(
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          style={{ width: "100%" }}
        />
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 12 }}>
        <label>Experience</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value as any)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Goal */}
      <div style={{ marginBottom: 12 }}>
        <label>Goal</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value as any)}>
          <option value="job">Job</option>
          <option value="startup">Startup</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      {/* Daily Availability */}
      <div style={{ marginBottom: 12 }}>
        <label>Daily Availability (hours)</label>
        <input
          type="number"
          min={1}
          value={dailyAvailability}
          onChange={(e) => setDailyAvailability(Number(e.target.value))}
        />
      </div>

      {/* Weekly Commitment */}
      <div style={{ marginBottom: 12 }}>
        <label>Weekly Commitment (days)</label>
        <input
          type="number"
          min={1}
          max={7}
          value={weeklyCommitment}
          onChange={(e) => setWeeklyCommitment(Number(e.target.value))}
        />
      </div>

      {/* Submit */}
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {/* Error */}
      {error && (
        <pre style={{ color: "red", marginTop: 16 }}>
          Error: {error}
        </pre>
      )}

      {/* Result */}
      {result && (
        <pre style={{ marginTop: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
