import query from "./query";


const profile = () => query("/user/profile", {method: "get"});

const getUserVotes = () => query("/user/votes");

const getUserVote = id => query(`/user/vote/${id}`);

const saveResult = (vote_id, data) => query(`/user/result/save/${vote_id}`, {method: "post", data});

const getResult = vote_id => query(`/user/result/view/${vote_id}`);

const getVoteDataAndResult = vote_id => query(`/user/result/viewdata/${vote_id}`);

export default {
    profile,
    getUserVotes,
    getUserVote,
    saveResult,
    getResult,
    getVoteDataAndResult
}


