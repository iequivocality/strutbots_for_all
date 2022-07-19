interface CreditHeader {
    section: string;
    key: string;
    title: string;
    filterExistingEntries?: boolean;
}

const CreditHeaders: CreditHeader[] = [
    { section: 'events', key: 'follows', title: 'New Followers!' },
    { section: 'events', key: 'cheers', title: 'Cheers!' },
    { section: 'events', key: 'subs', title: 'New Subscribers!' },
    { section: 'events', key: 'reSubs', title: 'Those who Resubscribed!' },
    {
        section: 'events',
        key: 'giftSubs',
        title: 'Crazy people who gave gift subs!',
    },
    { section: 'events', key: 'giftBombs', title: 'Gift Bombers' },
    { section: 'events', key: 'raided', title: 'Crazy Raiders' },
    {
        section: 'events',
        key: 'rewardRedemptions',
        title: 'Decided to waste channel points',
    },
    {
        section: 'events',
        key: 'goalContributions',
        title: 'Contributed to goals!',
    },
    { section: 'events', key: 'pyramids', title: 'Pyramid Builders' },
    { section: 'users', key: 'editors', title: 'Editors' },
    {
        section: 'users',
        key: 'moderators',
        title: 'Moderators',
        filterExistingEntries: true,
    },
    { section: 'users', key: 'subscribers', title: 'Subscribers' },
    {
        section: 'users',
        key: 'vips',
        title: 'VIPs!',
        filterExistingEntries: true,
    },
    { section: 'groups', key: '<group name>', title: '<group title>' },
    {
        section: 'users',
        key: 'users',
        title: 'Viewers',
        filterExistingEntries: true,
    },
    { section: 'hypeTrain', key: 'conductors', title: 'Hype Train Conductors' },
    {
        section: 'hypeTrain',
        key: 'contributors',
        title: 'Hype Train Passengers',
    },
    { section: 'top', key: 'allBits', title: 'All time big biters!' },
    { section: 'top', key: 'monthBits', title: 'Monthly Biters' },
    { section: 'top', key: 'weekBits', title: 'Bigsy Bitsy' },
    { section: 'top', key: 'channelRewards', title: 'Channel Point Whales' },
];

export default CreditHeaders;
