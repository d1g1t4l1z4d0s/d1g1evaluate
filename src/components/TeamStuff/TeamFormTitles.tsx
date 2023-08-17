export default function TeamFormTitles({
    isEntityFields, 
    isStatFields, 
    isGoalkeeperFields, 
    isLowBlockFields,
    isMidBlockFields,
    isHighBlockFields
}: {
    isEntityFields: boolean, 
    isStatFields: boolean, 
    isGoalkeeperFields: boolean, 
    isLowBlockFields: boolean,
    isMidBlockFields: boolean,
    isHighBlockFields: boolean
}) {
    return (
        <div className='form-titles'>
            <span className={isEntityFields ? 'active' : ''}>&#x2460; Entity</span>
            <span className={isStatFields ? 'active' : ''}>&#x2461; Stats</span>
            <span className={isGoalkeeperFields ? 'active' : ''}>&#x2462; Goalkeeper</span>
            <span className={isLowBlockFields ? 'active' : ''}>&#x2463; Low block</span>
            <span className={isMidBlockFields ? 'active' : ''}>&#x2464; Mid block</span>
            <span className={isHighBlockFields ? 'active' : ''}>&#x2465; High block</span>
        </div>
    )
}