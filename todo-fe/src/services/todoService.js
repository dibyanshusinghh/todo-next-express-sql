const BASE_URI = process.env.BASE_URI || 'http://localhost:3001/api'

export const getAllTodos = async () => {
    const res = await fetch(`${BASE_URI}/todos`);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("API Call Failed")
    }

}

export const updateTodo = async (id, data) => {
    const res = await fetch(`${BASE_URI}/todos/${id}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("API Call Failed")
    }
}

export const addTodo = async (data) => {
    const res = await fetch(`${BASE_URI}/todos`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("API Call Failed")
    }
}

export const deleteTodo = async (todoId) => {
    const res = await fetch(`${BASE_URI}/todos/${todoId}`, {
        method: 'delete'
    });
    if (res.status === 200) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("API Call Failed")
    }
}
