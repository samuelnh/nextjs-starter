"use client";

import { useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Member {
  id: string;
  role: string;
  user: {
    name: string;
    email: string;
  };
}

export function MembersClient({
  initialMembers,
  organizationId,
}: {
  initialMembers: Member[];
  organizationId: string;
}) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    const { data } = await authClient.organization.listMembers({
      query: { organizationId },
    });
    setMembers((data as unknown as Member[]) ?? []);
  }, [organizationId]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setInviting(true);
    setError("");
    try {
      const { error: inviteError } =
        await authClient.organization.inviteMember({
          email: email.trim(),
          role: "member",
        });
      if (inviteError) {
        setError(inviteError.message || "Failed to send invitation.");
        setInviting(false);
        return;
      }
      setEmail("");
      setInviteOpen(false);
      fetchMembers();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setInviting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            Manage your organisation&apos;s members.
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>Invite member</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.user.name}</TableCell>
                <TableCell>{m.user.email}</TableCell>
                <TableCell className="capitalize">{m.role}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No members yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a member</DialogTitle>
            <DialogDescription>
              Send an invitation email to add someone to your organisation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="invite-email">Email address</Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={inviting}>
                {inviting ? "Sending..." : "Send invitation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
