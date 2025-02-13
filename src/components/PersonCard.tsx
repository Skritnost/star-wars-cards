import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonCardProps {
    name: string;
    avatar?: string;
    onClick?: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, avatar, onClick }) => {
    return (
        <Card
            onClick={onClick}
            className="w-full max-w-sm shadow-md cursor-pointer transition-transform hover:scale-105"
        >
            <CardContent className="p-0">
                <img
                    src={avatar || '/default-person.jpg'}
                    alt={name}
                    className="w-full h-48 object-cover rounded-t"
                />
            </CardContent>
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-bold text-center truncate">{name}</CardTitle>
            </CardHeader>
        </Card>
    );
};

export default PersonCard;
