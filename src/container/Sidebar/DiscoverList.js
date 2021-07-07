import React from 'react';
import {
    DiscoverList as DiscoverListComponent,
    DiscoverItem
} from '../../components/SidebarComponent'
import { CgHashtag } from 'react-icons/cg'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

const DiscoverList = () => {
    const clickHandler = () => {
        console.log('click')
    }
    const data = [
        {
            id: 1,
            tag: 'anngonnaugon',
            icon: CgHashtag
        },
        {
            id: 2,
            tag: 'doimatto',
            icon: CgHashtag
        },
        {
            id: 3,
            tag: 'congaimientay',
            icon: CgHashtag
        },
        {
            id: 4,
            tag: '아씡꼬래정우사운드 - 정우얌',
            icon: BsMusicNoteBeamed
        },
        {
            id: 5,
            tag: 'Buồn làm chi em ơi (remix) - AP',
            icon: BsMusicNoteBeamed
        },
        {
            id: 6,
            tag: 'Laxed (Siren Beat) - Jawsh 685',
            icon: BsMusicNoteBeamed
        },
        {
            id: 7,
            tag: 'mashup 2021',
            icon: BiSearch
        },
        {
            id: 8,
            tag: "charli d'amelio",
            icon: BiSearch
        },
        {
            id: 9,
            tag: 'songkhoe247',
            icon: CgHashtag
        },
        {
            id: 10,
            tag: 'noitrochanhxa',
            icon: CgHashtag
        },
    ]
    return (
        <DiscoverListComponent
            title="Khám phá"
        >
            {data.map(item => (
                <DiscoverItem
                    key={item.id}
                    icon={item.icon}
                    tag={item.tag}
                    onClick={clickHandler}
                />
            ))}
        </DiscoverListComponent>
    );
};

export default DiscoverList;