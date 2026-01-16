"use client"
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase/clientApp";
import { collection, addDoc } from "firebase/firestore"
export default function Home() {

  const [votes, votesLoading, votesError] = useCollection(collection(db, "votes"));

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  const addVoteDoc = async (vote: string) => {
    const docRef = await addDoc(collection(db, "votes"), {
      vote
    })
    console.log(docRef)
  }

  return (
    <div>
      {votesError && <span>{votesError.message}</span>}
      <div>
        {votes?.docs.map(doc => (
          <p key={doc.id}>{JSON.stringify(doc.data())}</p>
        ))}
      </div>
      <button
        onClick={() => addVoteDoc("yes")}
      >
        Yes
      </button>
      <button
        onClick={() => addVoteDoc("no")}
      >
        No
      </button>
    </div>
  );
}
