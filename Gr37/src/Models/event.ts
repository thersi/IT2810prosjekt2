interface Author{
    id: number
}
interface PushData{
    commit_count: number
}
export interface Event{
    author: Author
    action_name: string
    created_at: Date
    push_data: PushData
}

export interface Merge{
    author: Author
    created_at: Date

}

