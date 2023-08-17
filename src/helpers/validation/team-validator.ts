import { z } from 'zod'

const ReliablePerformanceSchema = z.object({
    goalkeeper: z.object({
        name: z.string().nonempty('Goalkeeper name field is required').min(2, 'Goalkeeper name must contain more than 2 characters'),
        caughtBalls: z.number({ invalid_type_error: 'Caught balls must be a number' }).nonnegative('Caught balls cannot be a negative number'),
        concededGoals: z.number({ invalid_type_error: 'Conceded goals must be a number' }).nonnegative('Conceded goals cannot be a negative number'),
        cleanSheets: z.number({ invalid_type_error: 'Clean sheets must be a number' }).nonnegative('Clean sheets cannot be a negative number')
    }),
    lowBlock: z.object({
        name: z.string().nonempty('Low block name field is required').min(2, 'Low block name must contain more than 2 characters'),
        tackles: z.number({ invalid_type_error: 'Tackles must be a number' }).nonnegative('Tackles cannot be a negative number'),
        behavior: z.enum(['good', 'regular', 'bad'])
    }),
    midBlock: z.object({
        name: z.string().nonempty('Mid block name field is required').min(2, 'Mid block name must contain more than 2 characters'),
        assists: z.number({ invalid_type_error: 'Assists must be a number' }).nonnegative('Assists cannot be a negative number'),
        completedPasses: z.number({ invalid_type_error: 'Completed passes must be a number' }).nonnegative('Completed passes average cannot be a negative number'),
    }),
    highBlock: z.object({
        name: z.string().nonempty('High block name field is required').min(2, 'High block name must contain more than 2 characters'),
        scoredGoals: z.number({ invalid_type_error: 'Scored goals by a forward must be a number' }).nonnegative('Forward scored goals cannot be a negative number'),
        shotsOnTarget: z.number({ invalid_type_error: 'Shots on target must be a number' }).nonnegative('Shots on target average cannot be a negative number'),
    })
})

const StatsSchema = z.object({
    scoredGoals: z.number({ invalid_type_error: 'Scored goals must be a number' }).nonnegative('Scored goals cannot be a negative number'),
    goalsAgainst: z.number({ invalid_type_error: 'Goals Against must be a number' }).nonnegative('Goals against cannot be a negative number'),
    goalBalance: z.number({ invalid_type_error: 'Goal balance must be a number' }),
    yellowCards: z.number({ invalid_type_error: 'Yellow cards must be a number' }).nonnegative('Yellow cards cannot be a negative number'),
    redCards: z.number({ invalid_type_error: 'Red cards must be a number' }).nonnegative('Red cards cannot be a negative number'),
    matches: z.number({ invalid_type_error: 'Played matches must be a number' }).nonnegative('Played matches cannot be a negative number'),
    wins: z.number({ invalid_type_error: 'Wins must be a number' }).nonnegative('Wins cannot be a negative number'),
    draws: z.number({ invalid_type_error: 'Draws must be a number' }).nonnegative('Draws cannot be a negative number'),
    losses: z.number({ invalid_type_error: 'Losses must be a number' }).nonnegative('Losses cannot be a negative number'),
    pointsAverage: z.number({ invalid_type_error: 'Points average must be a number' }),
    reliablePerformance: ReliablePerformanceSchema
})

export const TeamSchema = z.object({
    teamId: z.string().min(2, 'Team ID cannot be less than 2 characters').max(3, 'Team ID cannot be greater than 3').nonempty('Team ID field is required'),
    name: z.string().nonempty('Team name field is required').min(2, 'Team name must contain more than 2 characters'),
    manager: z.string().nonempty('Manager name field is required').min(2, 'Manager name must contain more than 2 characters'),
    logo: z.string().nonempty('Logo field is required'),
    stats: StatsSchema
})