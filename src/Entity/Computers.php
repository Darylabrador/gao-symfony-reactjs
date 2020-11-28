<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ComputersRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ComputersRepository::class)
 */
class Computers
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Unique(message="Le poste existe déjà")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Assigns::class, mappedBy="computers")
     */
    private $desktop_id;

    public function __construct()
    {
        $this->desktop_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Assigns[]
     */
    public function getDesktopId(): Collection
    {
        return $this->desktop_id;
    }

    public function addDesktopId(Assigns $desktopId): self
    {
        if (!$this->desktop_id->contains($desktopId)) {
            $this->desktop_id[] = $desktopId;
            $desktopId->setComputers($this);
        }

        return $this;
    }

    public function removeDesktopId(Assigns $desktopId): self
    {
        if ($this->desktop_id->removeElement($desktopId)) {
            // set the owning side to null (unless already changed)
            if ($desktopId->getComputers() === $this) {
                $desktopId->setComputers(null);
            }
        }

        return $this;
    }
}
