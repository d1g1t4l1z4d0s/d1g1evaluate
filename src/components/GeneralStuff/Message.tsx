import './Message.css'
export default function Message({ text, kind }: { text: string, kind: 'error' | 'warning' | 'success' }) {
    return (
        <div className={kind}>
            <p>{text}</p>
        </div>
    )
}