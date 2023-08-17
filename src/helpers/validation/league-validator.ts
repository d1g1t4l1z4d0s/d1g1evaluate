import { z } from 'zod'

export const LeagueSchema = z.object({
    name: z.string().nonempty('League name field is required').min(2, 'League name must contain more than 2 characters'),
    logo: z.string().nonempty('Logo field is required').min(2, 'Logo must contain more than 2 characters'),
    currentChampion: z.string().optional(),
})