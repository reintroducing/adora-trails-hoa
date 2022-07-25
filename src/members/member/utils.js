export function getMemberMotions(id, sessions) {
    const participatedMotions = [];

    sessions.forEach(({attendees, date, motions}) => {
        if (!attendees.includes(id)) {
            return;
        }

        motions.forEach(motion => {
            const {
                votes: {for: voteFor, against, abstain},
            } = motion;

            if (
                voteFor.includes(id) ||
                against.includes(id) ||
                abstain.includes(id)
            ) {
                participatedMotions.push({date, ...motion});
            }
        });
    });

    return participatedMotions;
}
