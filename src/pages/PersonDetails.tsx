import React, { useState, useRef, FormEvent } from "react"
import { useParams } from "react-router-dom"
import { usePerson, PersonData } from "@/hooks/use-person"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import LoadingOverlay from '@/components/LoadingOverlay.tsx';

const editableFields: { key: keyof PersonData; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "birthYear", label: "Birth Year" },
    { key: "eyeColor", label: "Eye Color" },
    { key: "gender", label: "Gender" },
    { key: "hairColor", label: "Hair Color" },
    { key: "height", label: "Height" },
    { key: "mass", label: "Mass" },
    { key: "skinColor", label: "Skin Color" },
];

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString()
}

const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, isError } = usePerson(id || "")
    const [person, setPerson] = useState<PersonData>()
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        if (data) setPerson(data)
    }, [data])

    if (isLoading) {
        return <LoadingOverlay />
    }
    if (isError || !person) {
        return <div className="p-4 text-center">Character not found.</div>
    }

    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        if (!id || !person || !formRef.current) return

        const formData = new FormData(formRef.current)

        const updatedPerson: PersonData = { ...person, edited: new Date().toString() }

        editableFields.forEach((field) => {
            const value = formData.get(field.key);
            updatedPerson[field.key] = value as string;
        })

        const file = formData.get("avatar") as File
        if (file && file.size > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                updatedPerson.avatar = reader.result as string
                finalizeUpdate(updatedPerson)
            }
            reader.readAsDataURL(file)
        } else {
            finalizeUpdate(updatedPerson)
        }
    }

    const finalizeUpdate = (updated: PersonData) => {
        setPerson(updated)
        localStorage.setItem(`person-${id}`, JSON.stringify(updated))
        setIsEditing(false)
    }

    return (
        <div className="min-h-screen p-4">
            <div className="container mx-auto max-w-2xl">
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-center">
                            {person.name}
                        </CardTitle>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button className="rounded"  type="submit" form="personForm">
                                    Save
                                </Button>
                                <Button className="rounded" variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button className="rounded"  onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-6">
                            <form
                                id="personForm"
                                ref={formRef}
                                className="space-y-6"
                                onSubmit={handleSave}
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <img
                                        src={person.avatar || "/default-person.jpg"}
                                        alt={person.name}
                                        className="w-32 h-32 object-cover rounded"
                                    />

                                    {isEditing ? (
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label htmlFor="avatar">Avatar</Label>
                                            <input
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                className="border border-input rounded p-1"
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {editableFields.map((field) => (
                                        <div key={field.key} className="space-y-1">
                                            <Label htmlFor={field.key}>{field.label}</Label>

                                            { isEditing ? (
                                                <input
                                                    id={field.key}
                                                    name={field.key}
                                                    type="text"
                                                    className="border border-input rounded p-1 w-full"
                                                    defaultValue={person[field.key] || ""}
                                                />
                                            ) : (
                                                <p className="text-sm text-muted-foreground">
                                                    {person[field.key]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label>Created</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(person.created)}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Edited</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(person.edited)}
                                        </p>
                                    </div>
                                </div>
                            </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CharacterDetail
