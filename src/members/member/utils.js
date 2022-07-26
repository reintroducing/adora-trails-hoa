export function getMemberMotions({id, sessions, filters}) {
    let participatedMotions = [];

    sessions.forEach(({attendees, date, motions}) => {
        if (!attendees.includes(id)) {
            return;
        }

        motions.forEach(motion => {
            const {
                votes: {for: voteFor, against, abstain},
                ...rest
            } = motion;

            if (
                voteFor.includes(id) ||
                against.includes(id) ||
                abstain.includes(id)
            ) {
                const vote = against.includes(id)
                    ? 2
                    : abstain.includes(id)
                    ? 3
                    : 1;

                participatedMotions.push({date, vote, ...rest});
            }
        });
    });

    if (filters && filters?.vote !== '0') {
        participatedMotions = participatedMotions.filter(
            ({vote}) => parseInt(filters.vote, 10) === vote
        );
    }

    if (filters && filters?.categories) {
        participatedMotions = participatedMotions.filter(({categories}) => {
            const intersection = filters.categories.filter(i =>
                categories.includes(i)
            );

            return intersection.length;
        });
    }

    return participatedMotions;
}
