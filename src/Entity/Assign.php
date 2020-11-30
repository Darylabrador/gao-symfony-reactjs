<?php

namespace App\Entity;

use App\Repository\AssignRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AssignRepository::class)
 */
class Assign
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"attribution", "clientinfo", "attrib"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"attribution", "clientinfo", "attrib"})
     */
    private $hours;

    /**
     * @ORM\Column(type="date")
     * @Groups({"attribution", "clientinfo", "attrib"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Computer::class, inversedBy="assigns")
     */
    private $computer;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="assigns")
     * @Groups({"attribution", "clientinfo", "attrib"})
     */
    private $client;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function setHours(int $hours): self
    {
        $this->hours = $hours;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getComputer(): ?Computer
    {
        return $this->computer;
    }

    public function setComputer(?Computer $computer): self
    {
        $this->computer = $computer;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }
}
