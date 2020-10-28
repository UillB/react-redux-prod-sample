import query from "./query";


const getUsers = () => query("/admin/users");

const setAdmin = (id, isAdmin) => query(`/admin/users/${id}`, {method: "put", data: {isAdmin}});

const deleteUser = id => query(`/admin/users/${id}`, {method: "delete"});

const getVotes = () => query("/admin/votes");

const getVote = id => query(`/admin/votes/${id}`);

const createVote = data => query(`/admin/votes`, {method: "post", data});

const updateVote = data => query(`/admin/votes/${data.id}`, {method: "put", data});

const deleteVote = data => query(`/admin/votes/${data.id}`, {method: "delete"});

const getGroups = () => query("/admin/groups");

const updateUserGroups = (groups, userId) => query(`/admin/groups/${userId}`, {method: "put", data: groups});

const createQuestionId = () => query(`/admin/question`, {method: "post"});

const deleteQuestionId = id => query(`/admin/question/${id}`, {method: "delete"});


export default {
    getUsers,
    getVotes,
    deleteUser,
    setAdmin,
    getVote,
    createVote,
    updateVote,
    deleteVote,
    getGroups,
    updateUserGroups,
    createQuestionId,
    deleteQuestionId
}
